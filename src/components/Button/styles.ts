import styled from 'styled-components';

interface IProps {
  color?: string;
}

export const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 0 16px;
`;

export const Btn = styled.button<IProps>`
  background: ${({ theme, color }) => color || theme.purple}15;
  border: 1px solid ${({ color, theme }) => color || theme.purple};
  color: ${({ color, theme }) => color || theme.purple};
  border-radius: 5px;
  padding: 8px 40px;
  outline: none;
  cursor: pointer;
  width: 100%;
  margin: 5px 0;

  :hover {
    filter: brightness(1.3);
  }
`;

export const Overlay = styled.span<IProps>`
  position: absolute;
  background: ${({ theme, color }) => color || theme.purple};
  color: ${({ theme }) => theme.background};
  bottom: 0;
  right: 0;
  border-radius: 1000px;
  font-weight: 600;
  padding: 5px 10px;
  font-size: 12px;
`;
