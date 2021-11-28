import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.cards};
  position: absolute;
  top: 40%;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 40px;
  border-radius: 5px;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  background: ${({ theme }) => theme.black};
  opacity: 0.6;
  z-index: 10;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.text};
`;

export const Label = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2px;
`;

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.cards};
  padding: 8px 15px;
  color: ${({ theme }) => theme.text};

  :disabled {
    cursor: not-allowed;
    filter: brightness(0.7);
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 15px;
`;

export const GraphContainer = styled.div`
  margin-left: 15px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

const load1 = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`;

export const Loader = styled.div`
  color: ${({ theme }) => theme.lightText};
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);
  background: ${({ theme }) => theme.lightText};
  animation: ${load1} 1s infinite ease-in-out;
  animation-delay: -0.16s;
  width: 1em;
  height: 4em;

  :before,
  :after {
    background: ${({ theme }) => theme.lightText};
    animation: ${load1} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }

  :before,
  :after {
    position: absolute;
    top: 0;
    content: '';
  }

  :before {
    left: -1.5em;
    animation-delay: -0.32s;
  }

  :after {
    left: 1.5em;
  }
`;
