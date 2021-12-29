import React, { useMemo } from 'react';
import ReactJson from 'react-json-view';
import { color } from 'renderer/App/styles/theme';
import ResponseContent from './ResponseContent/ResponseContent';
import styled from "styled-components"
import { FlexColumn } from '../General/Flex';


const ResponseColumn = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ResponseEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 35px;
  color: ${({ theme: { color } }) => color.lightGrey};
`;



export default function ResponseScreen({ response }) {
  return (
    <ResponseColumn>
      {response ? (
      <ResponseContent response={response}/>
    ) : (
        <ResponseEmpty>No responses to display</ResponseEmpty>
      )}
    </ResponseColumn>
  );
}
