import styled from 'styled-components';

interface IContentProps {
  horizontal?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
`;

export const Content = styled.div<IContentProps>`
  width: 100%;
  padding: 64px;
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
  justify-content: center;
  padding: 5px;
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

export const GeneVisualization = styled.span`
  background: ${({ theme }) => theme.cards};
  padding: 24px;
  width: 100%;
  text-align: center;
  font-size: 36px;
  background: ${({ theme }) => theme.cards};
  border-radius: 5px;
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
