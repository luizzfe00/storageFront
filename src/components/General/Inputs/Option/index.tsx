import React from 'react';

import { OptionContainer } from '../Styles/Option';

interface Option {
  value: any;
  [props: string]: any;
}

const Option: React.FC<Option> = ({ value, children }) => {
  return <OptionContainer value={value}>{children}</OptionContainer>;
};

export default Option;
