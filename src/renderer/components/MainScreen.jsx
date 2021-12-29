import React, { useEffect, useState } from 'react';
import styled from "styled-components"

import { useConfig } from 'renderer/context/config';
import ErrorMessage from './General/ErrorMessage';
import RequestForm from './RequestForm/RequestForm';
import ResponseScreen from './ResponseScreen/ResponseScreen';


const FormContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: ${({ theme: { color } }) => color.backgroundBlack};
`;


export default function MainScreen() {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null)

  return (
    <FormContainer>
      {error && <ErrorMessage setError={setError} error={error} />}
      <RequestForm setResponse={setResponse} error={error} setError={setError} />
      <ResponseScreen response={response} />
    </FormContainer>
  );
}
