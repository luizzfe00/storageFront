import { connect } from 'formik';
import React from 'react';

import UtilsFunctions from '../../../../utils';

import Input, { InputInterface } from '../FormikInput';

import { Prepend } from './styles';

interface Monetary extends InputInterface {
  name: string;
  currency?: string;
  width?: string;
  prepended?: boolean;
  prefix?: string;
  [prop: string]: any;
}

const Monetary: React.FC<InputInterface> = ({
  currency = 'R$',
  width = '100px',
  prepended,
  prefix,

  min,
  max,
  onChange,

  ...props
}: InputInterface) => {
  const prependMargin = '0 0 0 -1px';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = UtilsFunctions.removeFormatting(event.target.value);

    if (min && Number(value) < min) return;
    if (max && Number(value) > max) return;

    if (onChange) onChange(event);
  };

  const formatter = (value: string) =>
    UtilsFunctions.formatCurrency(Number(value) / 100, true);

  return (
    <Input
      width={width}
      isFormatted
      format={formatter}
      decimalSeparator=","
      thousandSeparator="."
      // decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      type="text"
      prepend={prepended}
      prefix={prefix}
      prependedMargin={prependMargin}
      onChange={handleChange}
      {...props}
    >
      {prepended && <Prepend>{currency}</Prepend>}
    </Input>
  );
};

export default Monetary;
