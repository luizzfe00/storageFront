import { Field, connect, useField, ErrorMessage } from 'formik';
import React, {
  SelectHTMLAttributes,
  useState,
  useEffect,
  ReactElement,
} from 'react';

import { onSelectChangeProps } from '../definitions';
import { Container, StyledSelect, StyledOption, Label } from '../Styles/Select';

export type onSelectChange = ({ name, value }: onSelectChangeProps) => void;

export type onChange = ({
  name,
  newValue,
}: {
  name: string;
  newValue: any;
}) => void;

interface Select
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string | JSX.Element;
  labelFontSize?: string;
  readOnly?: boolean;
  block?: boolean;
  name?: string;
  areaName?: string;
  isLoading?: boolean;
  fieldName: string;
  bold?: boolean;

  onChange?: onSelectChange;
}

interface OptionElement {
  props: {
    value: string | number;
    children: string | number;
  };
}

const Select: React.FC<Select> = ({
  name = 'select',
  label,
  labelFontSize,
  readOnly = false,
  block,
  children,
  value,
  defaultValue,
  areaName,
  isLoading,
  fieldName,
  bold,
  onChange,
}: Select) => {
  const [input, meta] = useField(fieldName);
  const [largestOption, setLargestOption] = useState<any>(5);
  const [selected, setSelected] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClose = () => setIsOpen(false);
  const options = React.Children.toArray(children) as OptionElement[];
  const optionsQTD = options.length;

  useEffect(() => {
    const setFirstValue = () => {
      if (optionsQTD) {
        if (!value && !defaultValue) {
          setSelected(options[0].props?.children);
        } else {
          setSelected(
            options?.filter(
              ({ props: option }) =>
                String(option.value) === String(defaultValue) ||
                String(option.value) === String(value),
            )[0]?.props.children,
          );
        }
      }
    };

    setFirstValue();
  }, [value, optionsQTD]);

  useEffect(() => {
    if (optionsQTD)
      setLargestOption(
        options.reduce((largest, curr) => {
          const currentLength = String(curr.props.children).length;

          if (currentLength >= largestOption) {
            largest = currentLength < 20 ? currentLength : 20;
          }
          return largest;
        }, 5),
      );
  }, []);

  useEffect(() => {
    if (isOpen) window.addEventListener('click', handleClose);

    return () => window.removeEventListener('click', handleClose);
  }, [isOpen]);

  const toggleIsOpen = () => {
    if (!readOnly) setIsOpen(!isOpen);
  };

  const handleOptions = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLSelectElement;

    setSelectedOption(value);

    if (onChange) onChange({ name, value });

    toggleIsOpen();
  };

  const renderOptions = (): ReactElement[] => {
    const selectOptions = Object.values(options).map((option) => (
      <StyledOption
        key={`option#${option.props.value}`}
        value={option.props.value}
        selected={option.props.children === selected}
      >
        {option.props.children}
      </StyledOption>
    ));

    return selectOptions;
  };

  const selectID = typeof label === 'string' ? label.replace(/\s/g, '') : name;

  const selectProps = {
    isValid: meta.error ? meta.error?.length > 0 : true,
    bold,
    isOpen,
    largestOption,
    disabled: readOnly || isLoading,
  };

  return (
    <Container
      block={block}
      largestOption={largestOption}
      areaName={areaName ?? name}
    >
      {label && (
        <Label htmlFor={selectID} fontSize={labelFontSize}>
          {label}
        </Label>
      )}
      <Field name={fieldName} as={StyledSelect}>
        {renderOptions()}
      </Field>
      <ErrorMessage name={fieldName} />
    </Container>
  );
};

export default connect(Select);
