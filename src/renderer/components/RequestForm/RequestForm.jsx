import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Dropdown, Spinner, DropdownButton, Form, InputGroup, Button } from 'react-bootstrap';

import ConnectionError from 'main/Errors/ConnectionError';
import {
  headersJsonToPlainText,
  mapBodyToJson,
  mapHeaderStringTo2DArray,
} from '../../utils/mappers';
import { useConfig } from 'renderer/context/config';
import { SelectButton } from '../General/Buttons/GeneralButtons';

const CustomSpinner = styled(Spinner)`
  color: white;
`;

const RequestColumn = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 35%;
  min-width: 35%;
  border-right: 2px black solid;
  padding: 20px 20px 0 20px;
`;

const HttpMethodRow = styled(InputGroup)`
  width: 100%;
  margin-bottom: 20px;
  div {
    border-radius: 0;
  }
  button {
    border-radius: 0;
    color: ${({ theme: { color } }) => color.backgroundBlack};
    background-color: ${({ theme: { color } }) => color.primaryCyan};
    border-color: ${({ theme: { color } }) => color.primaryCyan};
    box-shadow: none;

    &:hover,
    :active,
    :focus,
    :active:focus {
      box-shadow: none;
      border-color: ${({ theme: { color } }) => color.primaryCyan};
      color: ${({ theme: { color } }) => color.backgroundBlack};
      background-color: ${({ theme: { color } }) => color.primaryCyan};
    }
  }
  div {
    padding: 0;
    border: 1px white solid;

    button {
      background-color: ${({ theme: { color } }) => color.lightGrey};
      color: white;
    }
  }
`;

const MethodSelectButton = styled(DropdownButton)`
  background-color: ${({ theme: { color } }) => color.primaryCyan};
`;

const RequestRow = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto; 
`;

const RequestInput = styled(Form.Control)`
  background-color: ${({ theme: { color } }) => color.lightGrey};
  color: white;
  border-radius: 0;
  :focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }
  :focus,
  :active,
  :hover {
    box-shadow: none;
    border-color: white;
    background-color: ${({ theme: { color } }) => color.lightGrey};
    color: white;
  }
  :focus-visible {
    border: 1px ${({ theme: { color } }) => color.primaryCyan} solid;
    outline: none;
  }
`;
const RequestLabel = styled(Form.Label)`
  color: white;
`;
const RequestTextArea = styled.input`
  background-color: ${({ theme: { color } }) => color.lightGrey};
  color: white;
  border-color: white;
  height: 220px;
  max-height: 220px;
  min-height: 220px;
  padding-left: 3px;
  ${({ theme: { medias } }) => medias.fullScreen} {
    height: 350px;
    max-height: 350px;
    min-height: 350px;
  }

  :focus-visible {
    border: 1px ${({ theme: { color } }) => color.orange} solid;
    outline: none;
  }
`;

const SendRequestButton = styled(SelectButton)`
  display: flex;
  justify-content: center;
  position: relative;
  max-height: 48px;
  margin-top: auto;
  margin-bottom: 15px;
  align-items: center;
  border-radius: 0;
`;


export default function RequestForm({ setError, error, setResponse }) {
  const [endpoint, setEndpoint] = useState('');
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [requestMethod, setRequestMethod] = useState('GET');

  const {config} = useConfig();

  function packRequests() {
    const dataPayload = config.objectLiteral && body ? mapBodyToJson(body) : body;
    const headersPayload = mapHeaderStringTo2DArray(headers);
    return {
      method: requestMethod,
      endpoint,
      headers: headersPayload,
      data: dataPayload,
    };
  }

  function handleTab(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      e.target.value = `${e.target.value.substring(
        0,
        start
      )}\t${e.target.value.substring(end)}`;
      e.target.selectionEnd = start + 1;
      e.target.selectionStart = e.target.selectionEnd;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const requestObj = packRequests();
      const res = await ipcRenderer.invoke('sendRequest', requestObj);
      if (res instanceof Error) throw res;

      const resJson = JSON.parse(res);
      const headersPlain = headersJsonToPlainText(resJson.reqHeaders, '\n');
      setHeaders(headersPlain);
      setResponse(resJson);
      setError(null);
      setLoading(false);
    } catch (err) {
      if (err.message === 'Connection timed out') {
        const connErr = new ConnectionError(err.message);
        setError(connErr);
      } 
      else{
        setError(err)
      }      
      setLoading(false);
    }
  }

  function handleSelectRequestMethod({ target }) {
    const methodName = target.value;
    setRequestMethod(methodName);
  }
  return (
    <RequestColumn onSubmit={(e) => e.preventDefault()}>
      <HttpMethodRow>
        <MethodSelectButton
          type="button"
          id="dropdown-item-button"
          title={requestMethod}
        >
          <Dropdown.Item
            onClick={(e) => handleSelectRequestMethod(e)}
            value="GET"
            as="button"
            type="button"
          >
            GET
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleSelectRequestMethod(e)}
            value="POST"
            as="button"
            type="button"
          >
            POST
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleSelectRequestMethod(e)}
            value="UPDATE"
            as="button"
            type="button"
          >
            UPDATE
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleSelectRequestMethod(e)}
            value="DELETE"
            as="button"
            type="button"
          >
            DELETE
          </Dropdown.Item>
        </MethodSelectButton>
        <RequestInput spellCheck={false} onChange={(e) => setEndpoint(e.target.value)} />
      </HttpMethodRow>
      <RequestRow className="mb-3" controlId="exampleForm.ControlTextarea1">
        <RequestLabel>Headers</RequestLabel>
        <RequestTextArea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          spellCheck={false}
          as="textarea"
        />
      </RequestRow>
      <RequestRow className="mb-3" controlId="exampleForm.ControlTextarea1">
        <RequestLabel>Body</RequestLabel>
        <RequestTextArea
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => handleTab(e)}
          spellCheck={false}
          as="textarea"
        />
      </RequestRow>
      <SendRequestButton
        $isError={!!error}
        type="submit"
        onClick={(e) => handleSubmit(e)}
        variant="primary"
        size="lg"
        disabled={!endpoint}
      >
        {loading ? <CustomSpinner animation="border" /> : `Send Request`}
      </SendRequestButton>
    </RequestColumn>
  );
}
