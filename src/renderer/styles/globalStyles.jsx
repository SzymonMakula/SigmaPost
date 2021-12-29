import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

#root {
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 8px;
  height: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme: { color } }) => color.backgroundBlack};;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { color } }) => color.orange};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme: { color } }) => color.orange};
  }
body{
  position: relative;
  color: white;
  height: 100vh;

  font-family: monospace;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
`;

export default GlobalStyle;
