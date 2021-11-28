import styled, { keyframes, css } from 'styled-components';

interface IContentProps {
  horizontal?: boolean;
}

interface IGeneVisualizationProps {
  keyboardIsVisible?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  height: 100%;
  overflow: auto;
`;

export const Content = styled.div<IContentProps>`
  width: 100%;
  padding: 48px;
  display: ${({ horizontal }) => (horizontal ? 'flex' : undefined)};
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  align-items: flex-end;
  justify-content: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.purple};
  text-align: right;
  font-size: 64px;
`;

export const Emoji = styled.span`
  font-size: 96px;
  margin: 0 5px;
`;

export const EmojiContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ThemeButton = styled.button`
  border: 0;
  cursor: pointer;
  background: transparent;
  padding: 10px;
  margin-left: auto;
  transition: all 0.2s;

  :hover {
    filter: brightness(1.3);
  }

  :active {
    filter: brightness(0.8);
    transition: all 0.01s;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 5px;
  min-height: 185px;
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

const cursorBlinking = keyframes`
  0% {
    opacity: 0;
  }
`;

export const GeneVisualizationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.cards};
  border-radius: 5px;
  width: 100%;
  flex: 1;
`;

export const GeneVisualization = styled.span<IGeneVisualizationProps>`
  padding: 24px;
  text-align: center;
  vertical-align: middle;
  font-size: 36px;
  min-height: 110px;
  cursor: text;

  ${({ theme, keyboardIsVisible }) =>
    keyboardIsVisible &&
    css`
      ::after {
        content: '';
        border-radius: 5px;
        width: 5px;
        height: 42px;
        background: ${theme.text};
        display: inline-block;
        animation: ${cursorBlinking} 1.5s steps(2) infinite;
        transform: translateY(8px);
      }
    `}
`;

export const TotalProfit = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.cards};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 5px;
  flex: 1;
`;

export const TotalProfitLabel = styled.span`
  color: ${({ theme }) => theme.lightText};
`;

export const TotalProfitAmount = styled.span`
  color: ${({ theme }) => theme.purple};
  font-size: 36px;
`;

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.cards};
  padding: 8px 15px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  margin: 5px 0;
`;
