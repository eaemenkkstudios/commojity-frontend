import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  .hidden-keyboard {
    max-height: 0;
    height: 0;
    transform: translateY(-200vh);
  }

  .keyboard {
    transition: all 0.8s;
    background: #c4c4c4;

    .hg-button {
      background: #ffffff;
    }
  }
`;
