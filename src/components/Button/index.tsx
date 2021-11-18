import React from 'react';

import { Container, Btn, Overlay } from './styles';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  overlayValue?: number;
  invert?: boolean;
  margin?: string;
  noPadding?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  color,
  overlayValue,
  invert,
  margin,
  noPadding,
  ...rest
}) => {
  return (
    <Container margin={margin} noPadding={noPadding}>
      <Btn color={color} invert={invert} {...rest} />
      {!!overlayValue && <Overlay color={color}>{overlayValue}%</Overlay>}
    </Container>
  );
};

Button.defaultProps = {
  color: undefined,
  overlayValue: undefined,
};

export default Button;
