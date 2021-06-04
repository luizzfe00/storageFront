import {
  connect,
  getIn,
  Field,
  useField,
  FormikProps,
  ErrorMessage,
} from 'formik';
import React, {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import {
  Container,
  InputLabel,
  ErrorContainer,
  InputContainer,
  MasterContainer,
  PrependedContainer,
  AppendedContainer,
} from './styles';

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  format?: string | ((val: string) => string);
  mask?: string;
  isFormatted?: boolean;

  name: string;
  validated?: boolean;
  disabled?: boolean;
  width?: string;
  block?: boolean;
  label?: string;
  labelAnimation?: boolean;
  labelFontSize?: string;
  inlineLabel?: boolean;
  labelWeight?: string;

  type?: 'text' | 'email' | 'number' | 'password' | 'date' | 'search' | 'url';

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

  formikProp?: FormikProps<any>;
  placeholder?: string;
  as?: string;

  validate?: (
    value: string | number,
  ) => undefined | string | Promise<string | undefined>;

  [props: string]: any;
}

const Input: React.FC<InputInterface> = ({
  format,
  name,
  title,
  placeholder,
  as,
  disabled,
  isLoading = false,
  label,
  labelAnimation = false,
  labelFontSize,
  labelWeight,
  inlineLabel,
  type = 'text',
  validate,

  block = false,
  prepend = false,
  append = false,
  flexColumn = false,

  color,

  paddingUpDown = 0,
  paddingRightLeft = 0,

  prependedMargin = '',
  appendedMargin = '',
  prependedColor,
  appendedColor,

  borderRadius = '',
  noRecolor = false,

  areaName,
  formikProp,
  children,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [isValid, setIsValid] = useState(true);
  const touched = getIn(formikProp?.touched, name);

  const shouldDisable = formikProp?.isSubmitting || disabled;

  useEffect(() => {
    if (meta.error) {
      if (meta.error.length > 0) {
        setIsValid(false);
      }
    } else {
      setIsValid(true);
    }
  }, [meta]);

  const inputProps = {
    ...field,
    ...props,
    id: name,
    title,
    type,
    name,
    placeholder,
    disabled: shouldDisable,
    onChange: disabled ? () => undefined : field.onChange,
  };

  const handleValidate = (value: string) => {
    return validate ? validate(value) : undefined;
  };

  const handleBlur = (event: React.FocusEvent): void => {
    if (props.onBlur) props.onBlur(event as React.FocusEvent<HTMLInputElement>);
    field.onBlur(event);
  };

  const childrenArray = props.children as ReactNode[];

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

  const inputID = label ? label.replace(/\s/g, '') : label;

  const renderLabel = (isStatic: boolean) => (
    <InputLabel
      weight={labelWeight}
      color={color}
      fontSize={labelFontSize}
      htmlFor={inputID}
      isEmpty={!props.value}
      isStatic={isStatic}
      disabled={disabled}
    >
      {label}
    </InputLabel>
  );

  const useNormalInput = !format;
  const isDate = type === 'date';
  const formatter = (val: string) => {
    let result: string | number = val;

    if (props.min && Number(val) < Number(props.min)) result = props.min;
    else if (props.max && Number(val) > Number(props.max)) result = props.max;

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
        borderRadius={borderRadius}
        disabled={disabled}
        color={color}
        block={block}
        isValid={isValid}
        paddingUpDown={paddingUpDown}
        paddingRightLeft={paddingRightLeft}
        title={validate ? meta.error : ''}
        isLoading={isLoading || true}
      >
        {getPrepended() ? (
          <PrependedContainer margin={prependedMargin} color={prependedColor}>
            {getPrepended()}
          </PrependedContainer>
        ) : null}
        <InputContainer block={block}>
          {label && labelAnimation ? renderLabel(false) : null}
          <Field
            as={as}
            {...inputProps}
            name={name}
            onBlur={handleBlur}
            validate={handleValidate}
          >
            {children ?? null}
          </Field>
          {getAppended() ? (
            <AppendedContainer margin={appendedMargin} color={appendedColor}>
              {getAppended()}
            </AppendedContainer>
          ) : null}
        </InputContainer>
      </Container>
      <ErrorContainer>
        <ErrorMessage name={name} />
      </ErrorContainer>
    </MasterContainer>
  );
};

export default connect(Input);
