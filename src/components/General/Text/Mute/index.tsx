import React from 'react';

import { Container } from './styles';

interface Mute {
  fontSize?: number | string;
  maxWidth?: string;
  [prop: string]: any;
}

const Mute: React.FC<Mute> = ({ fontSize, maxWidth, children }: Mute) => {
  return (
    <Container fontSize={fontSize} maxWidth={maxWidth}>
      {children}
    </Container>
  );
};

export default Mute;
