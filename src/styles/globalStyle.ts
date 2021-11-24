import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  #root {
    height: 100vh;
    background: ${({ theme }) => theme.background};
  }

  html, body {
    background: ${({ theme }) => theme.background};
  }

  .hidden-keyboard {
    max-height: 0;
    height: 0;
    transform: translateY(-2000vh);
  }

  .keyboard {
    transition: all 0.6s;
    background: #c4c4c4;

    .hg-button {
      background: #ffffff;
    }
  }
`;
