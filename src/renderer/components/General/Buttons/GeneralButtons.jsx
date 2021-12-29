import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const SelectButton = styled(Button)`
  color: ${({ $isError }) => ($isError ? 'white' : 'white')};
  background-color: ${({ $isError, theme: { color } }) =>
    $isError ? color.alertRed : '#4c4c4c'};
  border-color: ${({ $isError, theme: { color } }) =>
    $isError ? color.alertRed : 'white'};
  &:hover,
  :active,
  :focus,
  :active:focus {
    box-shadow: none;
    border-color: ${({ $isError, theme: { color } }) =>
      $isError ? color.alertRed : color.orange};
    opacity: 0.95;
    color: ${({ $isError, theme: { color } }) =>
      $isError ? 'white' : color.orange};
    background-color: ${({ $isError, theme: { color } }) =>
      $isError ? color.alertRed : '#4c4c4c'};
  }
  :disabled {
    background-color: ${({ $isError, theme: { color } }) =>
      $isError ? color.alertRed : '#4c4c4c'};
    border-color: grey;
  }
`;
