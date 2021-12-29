import { FormCheck } from 'react-bootstrap';
import styled from 'styled-components';
import { FlexColumn, FlexRow } from '../General/Flex';

export const ResponseTextDescription = styled.p`
  color: grey;
  margin-bottom: 0;
`;

export const ResponseTextValue = styled.p`
  color: ${({ statusColor }) => statusColor || 'white'};
  margin-bottom: 0;
  margin-left: 5px;
`;

export const ResponseHeadersColumn = styled(FlexColumn)`
  overflow: auto;
  height: 250px;
  min-height: 250px;
  font-size: 14px;

  padding: 20px;
  border-bottom: 2px ${({ theme: { color } }) => color.lightGrey} solid;
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

  ${({ theme: { medias } }) => medias.fullScreen} {
    height: 300px;
    min-height: 300px;
  }
`;

export const BodyFormatSwitch = styled(FormCheck)`
  position: absolute;
  left: 300px;
  color: ${({ $isChecked, theme: { color } }) =>
    $isChecked ? color.orange : 'grey'};
  input {
    background-color: grey;
    :checked {
      background-color: grey;
      border-color: grey;
    }
  }
`;

export const ResponseHead = styled(FlexRow)`
  position: relative;
  align-items: center;
  padding: 10px 0px 10px 20px;
`;
export const HeadDescription = styled.p`
  color: ${({ theme: { color } }) => color.primaryPink};
  margin: 0;
`;
export const HeadSizeDescription = styled.p`
  color: grey;
  margin: 0 0 0 10px;
`;
