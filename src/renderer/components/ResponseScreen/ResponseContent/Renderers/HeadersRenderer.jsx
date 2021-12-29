import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { headersArrayToPlainText } from '../../../../utils/mappers';
import { FlexRow } from '../../../General/Flex';

const HeadersPlainTextContainer = styled.p`
  margin: 0;
  width: auto;
  white-space: break-spaces;
`;

const HeaderRow = styled(FlexRow)`
  width: max-content;
  min-height: 20px;
  height: auto;
  margin-bottom: 0px;
`;

const ResponseHeaderDescription = styled.p`
  margin-bottom: 0;
  margin-right: 8px;
  color: ${({ theme: { color } }) => color.orange};
`;

const ResponseHeaderValue = styled.p`
  margin-bottom: 0;
  color: white;
`;
export default function HeadersRenderer({ headers, useRawData }) {
  const headersPlainText = headersArrayToPlainText(headers, '\n');

  return (
    <>
      {useRawData ? (
        <HeadersPlainTextContainer
          onClick={() => navigator.clipboard.writeText('dupa')}
        >
          {headersPlainText}
        </HeadersPlainTextContainer>
      ) : (
        headers.map((header) => (
          <HeaderRow key={header.name}>
            <ResponseHeaderDescription>
              {header.name}:
            </ResponseHeaderDescription>
            <ResponseHeaderValue>{header.value}</ResponseHeaderValue>
          </HeaderRow>
        ))
      )}
    </>
  );
}

HeadersRenderer.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  useRawData: PropTypes.bool.isRequired,
};
