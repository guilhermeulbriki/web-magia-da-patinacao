import { createGlobalStyle } from 'styled-components';
import { linearGradient } from 'polished';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${linearGradient({
      colorStops: ['#F2F2F2', '#E2E2E2'],
      toDirection: 'to bottom right',
    })};
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
