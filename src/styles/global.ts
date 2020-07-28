import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #f2f2f2;
    color: #00111F;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', serif;
    font-size: 18px;
  }

  button {
    cursor: pointer;
  }
`;
