import BodyError from 'renderer/Errors/malformedBody';
import safeEval from 'safe-eval';

export function mapHeaderStringTo2DArray(headersString) {
  const headersArray = headersString
    .split('\n')
    .map((headerRow) => headerRow.split(': ').map((string) => string.trim()));
  return headersArray.filter(
    (array) =>
      array.length === 2 && !array.some((string) => string.length === 0)
  );
}

export function mapBodyToJson(bodyString) {
  const bodyWithoutBreakLines = bodyString.replace(/(\r\n|\n|\r)/gm, '');
  try {
    const json = safeEval(`JSON.stringify({${bodyWithoutBreakLines}})`);
    return JSON.parse(json);
  } catch (error) {
    throw new BodyError('Malformed JSON');
  }
}

export function headersArrayToPlainText(headers, joinString = ',') {
  return headers
    .map((header) => `${header.name}:${header.value}`)
    .join(joinString);
}

export function headersJsonToPlainText(headers, joinString = ',') {
  return Object.keys(headers)
    .filter((key) => key !== 'Content-Length')
    .map((key) => [`${key}: ${headers[key]}`])
    .join(joinString);
}
