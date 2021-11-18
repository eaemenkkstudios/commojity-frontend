import styled from 'styled-components';

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
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  opacity: 0.7;
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
  color: ${({ theme }) => theme.lightText};
`;

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.lightText};
  background: ${({ theme }) => theme.cards};
  padding: 5px 15px;
  color: ${({ theme }) => theme.lightText};
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