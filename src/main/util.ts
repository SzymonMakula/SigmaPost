/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from 'url';
import path from 'path';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return `http://localhost:${port}/${htmlFileName}`;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(
      __dirname,
      '../renderer',
      `${htmlFileName}`
    )}`;
  };
}

const packResponseToString = (response) => {
  return JSON.stringify({
    data: response.data,
    reqHeaders: response.config.headers,
    path: response.request.path,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    url: response.request.res.responseUrl,
    httpVersion: response.request.res.httpVersion,
    method: response.config.method,
    ping: response.ping,
    host: response.request.host,
  });
};

export default packResponseToString;
