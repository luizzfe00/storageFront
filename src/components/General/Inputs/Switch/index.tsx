import React, { useState, useEffect, HTMLAttributes } from 'react';

import { Container } from '../Styles/Switch';

interface SwitchInterface
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  name?: string;
  value?: boolean;
  defaultValue?: boolean;

  leftText?: string;
  rightText?: string;
  offColor?: string;
  activeColor?: string;
  showTextEver?: boolean;
  readOnly?: boolean;
  height?: number;
  width?: number;
  fontSize?: number;

  marginAuto?: boolean;

  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;

  onChange?: (name: string, value: boolean) => void;
}

const Switch: React.FC<SwitchInterface> = ({
  name = '',
  value,
  defaultValue,
  leftText = '',
  rightText = '',
  offColor,
  activeColor,
  showTextEver = false,
  onChange,
  readOnly = false,
  height,
  width,
  fontSize,

  marginAuto = false,

  ...props
}: SwitchInterface) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (value !== selected) {
      setSelected(Boolean(value));
    }
  }, [value]);

  useEffect(() => {
    if (defaultValue && defaultValue !== selected)
      setSelected(Boolean(defaultValue));
    if (selected !== value) setSelected(Boolean(value));
  }, [defaultValue]);

  const handleChange = () => {
    if (!readOnly) {
      if (onChange) onChange(name, !selected);
      setSelected(!selected);
    }
  };

  console.log({ height, width });

  return (
    <Container
      onClick={handleChange}
      isOnLeft={selected}
      textWidth={selected ? rightText.length : leftText.length}
      textWidthLeft={leftText.length}
      textWidthRight={rightText.length}
      offColor={offColor}
      activeColor={activeColor}
      disabled={readOnly}
      height={height}
      width={width}
      fontSize={fontSize}
      marginAuto={marginAuto}
      {...props}
    >
      <span>{(showTextEver || !selected) && leftText}</span>
      <span>{(showTextEver || selected) && rightText}</span>
    </Container>
  );
};

export default Switch;
