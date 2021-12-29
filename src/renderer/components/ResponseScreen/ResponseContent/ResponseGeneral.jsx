/* eslint-disable @typescript-eslint/no-shadow */
import React, { useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useConfig } from 'renderer/context/config';
import { color } from '../../../styles/theme';
import { FlexColumn, FlexRow } from '../../General/Flex';
import {
  ResponseTextDescription,
  ResponseTextValue,
} from '../ResponseScreen.styles';

const ResponseGeneralColumn = styled(FlexColumn)`
  width: 100%;
  height: auto;
  min-height: 192px;
  overflow-x: auto;
  border-bottom: 2px ${({ theme: { color } }) => color.lightGrey} solid;
  box-sizing: content-box;
  padding: 20px;
`;

const ResponseGeneralRow = styled(FlexRow)`
  width: 100%;
  min-height: 25px;
  height: auto;
`;

const StatusIcon = styled.div`
  background-color: ${({ statusColor }) => statusColor || 'white'};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 10px;
`;

function statusToColor(status) {
  const statusString = String(status);
  switch (statusString[0]) {
    case '2':
      return color.green;
    case '3':
      return color.orange;
    case '4':
      return color.primaryPink;
    case '5':
      return color.red;
    default:
      return color.red;
  }
}

export default function ResponseGeneral({
  status,
  statusText,
  httpVersion,
  sentContentLength,
  bodySize,
  path,
  host,
  ping,
}) {
  const statusColor = useMemo(() => statusToColor(status), [status]);
  const { config } = useConfig();
  return (
    <ResponseGeneralColumn>
      <ResponseGeneralRow>
        <ResponseTextDescription>Status</ResponseTextDescription>
        <StatusIcon statusColor={statusColor} />
        <ResponseTextValue
          statusColor={statusColor}
        >{`${status} ${statusText}`}</ResponseTextValue>
      </ResponseGeneralRow>
      <ResponseGeneralRow>
        <ResponseTextDescription>Version</ResponseTextDescription>
        <ResponseTextValue>{httpVersion}</ResponseTextValue>
      </ResponseGeneralRow>
      <ResponseGeneralRow>
        <ResponseTextDescription>Transferred</ResponseTextDescription>
        <ResponseTextValue>
          {sentContentLength / 1000}kB({bodySize}kB)
        </ResponseTextValue>
      </ResponseGeneralRow>
      <ResponseGeneralRow>
        <ResponseTextDescription>Response Time</ResponseTextDescription>
        <ResponseTextValue>{ping}ms</ResponseTextValue>
      </ResponseGeneralRow>
      {config.extendedGeneral && (
        <>
          <ResponseGeneralRow>
            <ResponseTextDescription>Host</ResponseTextDescription>
            <ResponseTextValue>{host}</ResponseTextValue>
          </ResponseGeneralRow>
          <ResponseGeneralRow>
            <ResponseTextDescription>Resource</ResponseTextDescription>
            <ResponseTextValue>{path}</ResponseTextValue>
          </ResponseGeneralRow>
        </>
      )}
    </ResponseGeneralColumn>
  );
}

ResponseGeneral.propTypes = {
  status: PropTypes.number.isRequired,
  statusText: PropTypes.string.isRequired,
  httpVersion: PropTypes.string.isRequired,
  sentContentLength: PropTypes.number.isRequired,
  bodySize: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  ping: PropTypes.string.isRequired,
};
