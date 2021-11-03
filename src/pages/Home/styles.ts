import styled from 'styled-components';

interface IContentProps {
  horizontal?: boolean;
}

interface IButtonProps {
  color?: string;
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

export const Button = styled.button<IButtonProps>`
  background: ${({ theme, color }) => color || theme.purple}15;
  border: 1px solid ${({ color, theme }) => color || theme.purple};
  color: ${({ color, theme }) => color || theme.purple};
  border-radius: 5px;
  padding: 8px 40px;
  outline: none;
  cursor: pointer;
`;
