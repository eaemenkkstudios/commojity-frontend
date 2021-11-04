import styled from 'styled-components';

interface IContentProps {
  horizontal?: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

export const Card = styled.div`
  background: ${({ theme }) => theme.cards};
  border-radius: 5px;
  padding: 5px;
  color: ${({ theme }) => theme.text};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.purple};
  text-align: right;
  font-size: 48px;
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
