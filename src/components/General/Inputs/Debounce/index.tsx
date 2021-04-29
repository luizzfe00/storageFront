import React, { useState, useRef, useEffect } from 'react';

import Input, { InputInterface } from '../Input';

interface Debounce extends InputInterface {
  debounceTimeout?: number;
}

const Debounce: React.FC<Debounce> = ({
  onChange,
  debounceTimeout = 600,
  value,
  ...props
}: Debounce) => {
  const debTimeout = useRef(0);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (value !== localValue) setLocalValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);

    event.persist();
    clearTimeout(debTimeout.current);

    debTimeout.current = setTimeout(() => {
      if (onChange) onChange(event);
    }, debounceTimeout);
  };

  return <Input value={localValue} onChange={handleChange} {...props} />;
};

export default Debounce;
