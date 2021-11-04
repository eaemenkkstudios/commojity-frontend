import React from 'react';

import { Container, Btn, Overlay } from './styles';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  overlayValue?: number;
}

const Button: React.FC<IButtonProps> = ({ color, overlayValue, ...rest }) => {
  return (
    <Container>
      <Btn color={color} {...rest} />
      {!!overlayValue && <Overlay color={color}>{overlayValue}%</Overlay>}
    </Container>
  );
};

Button.defaultProps = {
  color: undefined,
  overlayValue: undefined,
};

export default Button;
