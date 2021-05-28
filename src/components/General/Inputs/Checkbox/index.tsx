import React from 'react';

import { Container, Label, StyledCheckbox } from './styles';

interface CheckboxProp {
  value: boolean;
  label?: string;
}

const Checkbox: React.FC<CheckboxProp> = ({ value, label }) => (
  <Container>
    <StyledCheckbox type="checkbox" checked={value} />
    <Label>{label}</Label>
  </Container>
);

export default Checkbox;
