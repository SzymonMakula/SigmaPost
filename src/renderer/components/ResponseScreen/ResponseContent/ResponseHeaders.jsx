import React from 'react';
import styled from 'styled-components';

import { FlexColumn } from 'renderer/components/General/Flex';
import {
  BodyFormatSwitch,
  HeadDescription,
  HeadSizeDescription,
  ResponseHead,
} from '../ResponseScreen.styles';
import HeadersRenderer from './Renderers/HeadersRenderer';

const ResponseHeadersColumn = styled(FlexColumn)`
  overflow: auto;
  height: 250px;
  min-height: 250px;
  font-size: 14px;

  padding: 20px;
  border-bottom: 2px ${({ theme: { color } }) => color.lightGrey} solid;
  ::-webkit-scrollbar-track {
    background: ${({ theme: { color } }) => color.lightGrey};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { color } }) => color.orange};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme: { color } }) => color.orange};
  }

  ${({ theme: { medias } }) => medias.fullScreen} {
    height: 300px;
    min-height: 300px;
  }
`;

export default function ResponseHeaders({
  headersSize,
  useRawData,
  setUseRawHeadersData,
  headers,
}) {
  return (
    <>
      <ResponseHead>
        <HeadDescription>Response Headers</HeadDescription>
        <HeadSizeDescription>({headersSize}B)</HeadSizeDescription>
        <BodyFormatSwitch
          onChange={() => setUseRawHeadersData((prevState) => !prevState)}
          value={useRawData}
          checked={useRawData}
          $isChecked={useRawData}
          type="switch"
          label="Raw Data"
        />
      </ResponseHead>
      <ResponseHeadersColumn>
        <HeadersRenderer headers={headers} useRawData={useRawData} />
      </ResponseHeadersColumn>
    </>
  );
}
