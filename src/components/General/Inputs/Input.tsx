import React, {
  useState,
  useEffect,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

import { inputFormat as dateFormat } from '../../../utils/dateFormatting';

import {
  Container,
  Input,
  InputLabel,
  FormattedInput,
  InputContainer,
  MasterContainer,
  PrependedContainer,
  AppendedContainer,
} from './Styles/Input';

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  format?: string | Function;
  mask?: string;
  isFormatted?: boolean;

  validated?: boolean;
  width?: string;
  block?: boolean;
  label?: string;
  labelAnimation?: boolean;
  labelFontSize?: string;
  inlineLabel?: boolean;
  labelWeight?: string;

  type?: 'text' | 'email' | 'number' | 'password' | 'date' | 'search' | 'url';

  validate?: boolean;
  prepend?: boolean;
  append?: boolean;
  prependedMargin?: string;
  appendedMargin?: string;
  prependedColor?: string;
  appendedColor?: string;

  borderRadius?: string;
  noRecolor?: boolean;
  flexColumn?: boolean;
  alignToRight?: boolean;
  backgroundColor?: string;
  color?: string;
  textSize?: number;
  letterSpacing?: number;
  paddingUpDown?: number;
  paddingRightLeft?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;

  isLoading?: boolean;

  recolorOnAutofill?: boolean;
  validation?: Function;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  dependency?: string;
  areaName?: string;

  [props: string]: any;
}

const InputComponent: React.FC<InputInterface> = ({
  format,
  mask,
  isFormatted,
  isLoading = false,
  label,
  labelAnimation = false,
  labelFontSize,
  labelWeight,
  inlineLabel,
  type = 'text',
  validate = false,

  width: inputWidth,
  block = false,
  prepend = false,
  append = false,
  flexColumn = false,

  color,
  textSize,
  letterSpacing,
  alignToRight = false,
  paddingUpDown = 0,
  paddingRightLeft = 0,
  fontWeight,

  prependedMargin = '',
  appendedMargin = '',
  prependedColor,
  appendedColor,

  borderRadius = '',
  noRecolor = false,
  recolorOnAutofill = false,

  validation,
  validated = false,

  onChange,

  dependency = '',
  areaName,
  ...props
}) => {
  const {
    value = '',
    children,
    disabled,
    readOnly,
    min,
    max,
    ...defaultInputProps
  } = props;

  const childrenArray = children as ReactNode[];

  const [invalidation, setInvalidation] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const checkInvalidation = (testValue: string): string | undefined =>
    validate && validation ? validation(testValue) : '';

  useEffect(() => {
    if (validate && validation) {
      setIsDirty(true);
      setInvalidation(checkInvalidation(String(value)) ?? '');
    }
  }, [validated, validation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);

    if (!disabled) {
      setInvalidation(checkInvalidation(event.target.value) ?? '');

      if (onChange) onChange(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value) setIsDirty(true);
    setIsFocused(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setIsFocused(true);
      event.target.removeAttribute('readonly');
    }
  };

  const getPrepended = () => {
    if (prepend && append) return childrenArray[0] || null;
    if (prepend && !append) return childrenArray || null;
  };

  const getAppended = () => {
    if (append && prepend)
      return childrenArray.length > 1 ? childrenArray[1] : null;
    if (append && !prepend) return childrenArray || null;

    return null;
  };

  const isValid = (): boolean => !(isDirty && checkInvalidation(String(value)));

  useEffect(() => {
    if (dependency) setInvalidation(checkInvalidation(String(value)) ?? '');
  }, [dependency]);

  const inputID = label ? label.replace(/\s/g, '') : label;

  const renderLabel = (isStatic: boolean) => (
    <InputLabel
      weight={labelWeight}
      color={color}
      fontSize={labelFontSize}
      htmlFor={inputID}
      isFocused={isFocused}
      isEmpty={!props.value}
      isStatic={isStatic}
      disabled={disabled}
    >
      {label}
    </InputLabel>
  );

  const isDate = type === 'date';
  const isReadOnly = readOnly || !labelAnimation;

  const inputProps = {
    id: inputID,
    value,
    disabled: disabled || readOnly,
    isReadOnly,
    isValid: isValid(),
    validated,
    isDirty: validate || isDirty,
    block,
    flexColumn,
    noRecolor,
    inputWidth,
    color,
    textSize,
    fontWeight,
    alignToRight,
    letterSpacing,
    recolorOnAutofill,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
    ...defaultInputProps,
  };

  const formatter = (val: string) => {
    let result: string | number = val;

    if (min && Number(val) < Number(min)) result = min;
    else if (max && Number(val) > Number(max)) result = max;

    return String(result);
  };

  return (
    <MasterContainer
      block={block}
      inlineLabel={inlineLabel}
      flexColumn={flexColumn}
      areaName={areaName}
    >
      {label && !labelAnimation ? renderLabel(true) : null}
      <Container
        noRecolor={noRecolor}
        readOnly={readOnly}
        borderRadius={borderRadius}
        disabled={disabled || readOnly}
        isFocused={isFocused}
        color={color}
        block={block}
        isValid={isValid()}
        paddingUpDown={paddingUpDown}
        paddingRightLeft={paddingRightLeft}
        title={validate || isDirty ? invalidation : ''}
        isLoading={isLoading || true}
      >
        {getPrepended() ? (
          <PrependedContainer margin={prependedMargin} color={prependedColor}>
            {getPrepended()}
          </PrependedContainer>
        ) : null}
        <InputContainer block={block}>
          {label && labelAnimation ? renderLabel(false) : null}
          {!isFormatted && !format && !isDate ? (
            <Input type={type} {...inputProps} />
          ) : (
            <FormattedInput
              type="text"
              mask={mask}
              format={
                isDate
                  ? dateFormat
                  : format ?? (min || max)
                  ? format || formatter
                  : undefined
              }
              {...inputProps}
            />
          )}
          {getAppended() ? (
            <AppendedContainer margin={appendedMargin} color={appendedColor}>
              {getAppended()}
            </AppendedContainer>
          ) : null}
        </InputContainer>
      </Container>
    </MasterContainer>
  );
};

export default InputComponent;
