import React from 'react';

import { Container, Label, StyledRadio } from './styles';

interface RadioProps {
  label?: string;
  value: boolean;
  radioColor?: string;
  fontWeight?: 400 | 500 | 600 | 700 | 800 | 900 | 'bold' | 'bolder';
  fontSize?: number;
}

const Radio: React.FC<RadioProps> = ({
  value,
  label,
  radioColor,
  fontWeight,
  fontSize,
}) => (
  <Container>
    <StyledRadio type="radio" checked={value} radioColor={radioColor} />
    <Label fontWeight={fontWeight} fontSize={fontSize}>
      {label}
    </Label>
  </Container>
);

export default Radio;
