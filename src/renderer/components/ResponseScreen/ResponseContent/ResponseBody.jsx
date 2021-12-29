import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import UtilityButton from 'renderer/components/General/Buttons/CircleButton';
import { FlexRow } from 'renderer/components/General/Flex';
import {
  BodyFormatSwitch,
  HeadDescription,
  HeadSizeDescription,
  ResponseHead,
  ResponseHeadersColumn,
} from '../ResponseScreen.styles';
import BodyRenderer from './Renderers/BodyRenderer';
import { ipcRenderer } from 'electron';
import { ContentCopyOutlined, SaveAltOutlined } from '@mui/icons-material';

const ResponseBodyColumn = styled(ResponseHeadersColumn)`
  height: 100%;
  border-bottom: none;
  min-height: auto;
`;
const UtiltiyButtonsRow = styled(FlexRow)`
  margin-left: auto;
  margin-right: 20px;
`;

const UtilButton = styled.button`
  display: flex;
  max-height: 22px;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background-color: inherit;
  width: auto;
  margin-right: 12px;
  color: grey;

  :hover{
    color: ${({theme: {color}}) => color.orange};
  }
  `


export default function ResponseBody({bodySize, setUseRawBodyData, useRawData, body}) {
  const isBodyJson = typeof body === 'object';
  const bodyText = isBodyJson ? JSON.stringify(body) : body;


  function handleCopy(){
    try{
      navigator.clipboard.writeText(bodyText)
    }
    catch(error){
      console.error(error)
    }
  }

  async function handleSave(){
    const res = await ipcRenderer.invoke('save', bodyText)
  }

  return (
    <>
      <ResponseHead>
        <HeadDescription>Response Body</HeadDescription>
        <HeadSizeDescription>({bodySize}kB)</HeadSizeDescription>
        <BodyFormatSwitch
          onChange={() => setUseRawBodyData((prevState) => !prevState)}
          value={useRawData}
          $isChecked={useRawData}
          checked={useRawData}
          type="switch"
          label="Raw Data"
        />
        <UtiltiyButtonsRow>
          <UtilButton onClick={handleCopy}><ContentCopyOutlined/>Copy</UtilButton>
          <UtilButton onClick={handleSave}><SaveAltOutlined/>Save</UtilButton>
        </UtiltiyButtonsRow>
      </ResponseHead>
      <ResponseBodyColumn>
        <BodyRenderer
          body={body}
          isJson={isBodyJson}
          useRawData={useRawData}
        />
      </ResponseBodyColumn>
    </>
  );
}

ResponseBody.propTypes = {
  bodySize: PropTypes.number.isRequired,
  setUseRawBodyData: PropTypes.func.isRequired,
  useRawData: PropTypes.bool.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ])
}