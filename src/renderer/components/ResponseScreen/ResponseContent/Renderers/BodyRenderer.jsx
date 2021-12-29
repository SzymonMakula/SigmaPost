import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

import { color } from 'renderer/styles/theme';

const BodyTextContainer = styled.div`
  height: 100%;
  font-size: 12px;
`;
const PreContainer = styled.pre`
  margin-bottom: 0;
  height: 100%;
  font-size: ${({ isJson }) => (isJson ? '14px' : '12px')};
  overflow: visible;
  max-width: 100%;
  width: 100%;
`;

export default function BodyRenderer({ body, isJson, useRawData }) {
  return (
    <>
      {isJson ? (
        <>
          {useRawData ? (
            <PreContainer isJson>{JSON.stringify(body, null, 4)}</PreContainer>
          ) : (
            <ReactJson
              style={{ backgroundColor: color.backgroundBlack }}
              enableClipboard={false}
              displayDataTypes={false}
              theme="monokai"
              src={body}
            />
          )}
        </>
      ) : (
        <>
          {useRawData ? (
            <BodyTextContainer>{body}</BodyTextContainer>
          ) : (
            <PreContainer>{body}</PreContainer>
          )}
        </>
      )}
    </>
  );
}

BodyRenderer.propTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  isJson: PropTypes.bool.isRequired,
  useRawData: PropTypes.bool.isRequired,
};
