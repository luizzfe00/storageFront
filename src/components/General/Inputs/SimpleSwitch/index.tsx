import React from 'react';

import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from './styles';

interface SwitchProps {
  name: string;
}

const SimpleSwitch: React.FC<SwitchProps> = ({ name }) => {
  return (
    <CheckBoxWrapper>
      <CheckBox type="checkbox" id={`#toogleSwitch${name}`} />
      <CheckBoxLabel htmlFor={`#toogleSwitch${name}`} />
    </CheckBoxWrapper>
  );
};

export default SimpleSwitch;
