import React from 'react';
import styled from 'styled-components';
import { FlexRow } from 'renderer/components/General/Flex';
import {
  ResponseTextDescription,
  ResponseTextValue,
} from '../ResponseScreen.styles';

const ResponseMethodRow = styled(FlexRow)`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: auto;
  max-height: 50px;
  height: 50px;
  border-bottom: 2px ${({ theme: { color } }) => color.lightGrey} solid;
  padding: 20px;

  p:nth-child(2) {
    font-size: 14px;
  }

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
`;

export default function ResponseMethod({ method, url }) {
  return (
    <ResponseMethodRow>
      <ResponseTextDescription>{method.toUpperCase()}</ResponseTextDescription>
      <ResponseTextValue>{url}</ResponseTextValue>
    </ResponseMethodRow>
  );
}
