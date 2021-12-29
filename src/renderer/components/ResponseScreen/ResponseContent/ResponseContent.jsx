import React, {  useState, useMemo } from 'react';

import ResponseGeneral from './ResponseGeneral';
import ResponseHeaders from './ResponseHeaders';
import ResponseMethod from './ResponseMethod';
import ResponseBody from './ResponseBody';
import { useConfig } from 'renderer/context/config';

const dataToBytes = (headers, body) => {
  const encoder = new TextEncoder()
  const headersSize = encoder.encode(JSON.stringify(headers)).length
  const isBodyJson = typeof body === 'object'
  const bodySize = encoder.encode(isBodyJson ? JSON.stringify(body) : body).length/1000
  return [headersSize, bodySize]
}


export default function ResponseContent({ response }) {
  const { headers, status, path, httpVersion, statusText, data : body, url, method, reqHeaders, ping, host } = response;
  const {config} = useConfig();
  const [useRawBodyData, setUseRawBodyData] = useState(config.rawResponse);
  const [useRawHeadersData, setUseRawHeadersData] = useState(config.rawResponse);

  const [headersSize, bodySize] = dataToBytes(headers, body)
  const sentContentLength = reqHeaders['Content-Length'] || 0;
  
  

  const headersArray = useMemo(() => Object.keys(headers)
    .sort()
    .map((key) => ({
      name: key,
      value: headers[key],
    })), [response])

  return (
    <>
    <ResponseMethod method={method} url={url}/>
    <ResponseGeneral status={status} statusText={statusText} bodySize={bodySize} sentContentLength={sentContentLength} httpVersion={httpVersion} host={host} path={path} ping={ping}/>
    <ResponseHeaders headers={headersArray} useRawData={useRawHeadersData} setUseRawHeadersData={setUseRawHeadersData} headersSize={headersSize}/>
    <ResponseBody body={body} bodySize={bodySize} setUseRawBodyData={setUseRawBodyData} useRawData={useRawBodyData}/>
    </>
  );
}
