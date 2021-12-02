import styled, { css } from 'styled-components';

interface IProps {
  color?: string;
  invert?: boolean;
  margin?: string;
  noPadding?: boolean;
  arrow?: boolean;
}

export const Container = styled.div<IProps>`
  width: 100%;
  position: relative;
  padding: ${({ noPadding }) => (noPadding ? 0 : '0 24px')};
  margin: ${({ margin }) => margin};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ arrow, theme }) =>
    arrow &&
    css`
      ::before {
        content: '⟵';
        color: ${theme.text};
        font-size: 36px;
        transform: translateY(-24px);
      }

      ::after {
        content: '⟞';
        color: ${theme.text};
        font-size: 36px;
        transform: translateY(-24px);
      }
    `}
`;

export const Btn = styled.button<IProps>`
  background: ${({ theme, color }) => color || theme.purple}${({ invert }) => (invert ? '' : 15)};
  border: 1px solid ${({ color, theme }) => color || theme.purple};
  color: ${({ color, invert, theme }) =>
    invert ? theme.background : color || theme.purple};
  border-radius: 5px;
  padding: 8px 40px;
  outline: none;
  cursor: pointer;
  width: 100%;
  margin: 5px 0;
  transition: all 0.2s;
  font-weight: 700;

  :hover {
    filter: brightness(1.3);
  }

  :active {
    filter: brightness(0.8);
    transition: all 0.01s;
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
