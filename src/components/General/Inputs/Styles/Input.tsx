import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import styled from 'styled-components';
import { colors } from '../../../../styles/colors';

interface MasterContainer {
  block: boolean;
  inlineLabel?: boolean;
  flexColumn?: boolean;
  areaName?: string;
}

export const MasterContainer = styled.div<MasterContainer>`
  width: ${({ block }) => (block ? '100%' : 'fit-content')};
  display: ${({ inlineLabel }) => (inlineLabel ? 'flex' : 'block')};
  flex-direction: ${({ flexColumn }) => (flexColumn ? 'column' : 'row')};
  grid-area: ${({ areaName }) => areaName ?? 'unset'};
`;

interface Container {
  noRecolor?: boolean;
  readOnly?: boolean;
  isFocused: boolean;
  borderRadius: string;
  color?: string;
  disabled?: boolean;
  block?: boolean;
  isValid?: boolean;
  paddingUpDown?: number;
  paddingRightLeft?: number;
  isLoading?: boolean;
}

export const Container = styled.div<Container>`
  position: relative;

  display: flex;
  align-items: center;
  cursor: pointer;

  background-color: ${({ disabled, readOnly, noRecolor }) =>
    (disabled || readOnly) && !noRecolor ? colors.primaryShadow : colors.white};

  padding: ${({ paddingUpDown, paddingRightLeft }) =>
    `${paddingUpDown}px ${paddingRightLeft}px`};

  width: ${({ block }) => (block ? 'calc(100% - 8px)' : 'fit-content')};

  border: 1.7px solid
    ${({ isValid }) => (isValid ? colors.inputBorder : colors.invalidBorder)};

  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  transition: all 150ms ease;

  & span:first-child {
    ${({ isLoading }) =>
      isLoading ? { width: '100%', display: 'block' } : {}};
  }

  &:hover,
  &:focus-within {
    cursor: ${({ readOnly }) => (readOnly ? 'normal' : 'text')};

    box-shadow: ${({ readOnly, isValid }) =>
      readOnly
        ? 'none'
        : `0 0 0 4px
        ${isValid ? colors.primaryShadow : colors.invalidBorder}`};
  }
`;

interface InputContainer {
  block: boolean;
}

export const InputContainer = styled.div<InputContainer>`
  position: relative;

  width: ${({ block }) => (block ? '100%' : 'fit-content')};

  display: flex;
  align-items: center;
`;

interface InputLabel {
  color?: string;
  fontSize?: string;
  isEmpty?: boolean;
  isFocused?: boolean;
  disabled?: boolean;
  isStatic?: boolean;
  weight?: string;
}

export const InputLabel = styled.label<InputLabel>`
  position: ${({ isStatic }) => (isStatic ? 'static' : 'absolute')};
  z-index: 1;
  left: ${({ isStatic }) => (isStatic ? '' : '12px')};
  cursor: ${({ isStatic }) => (isStatic ? '' : 'text')};

  background-color: ${({ disabled, isStatic }) =>
    disabled ? colors.primaryShadow : isStatic ? 'transparent' : colors.white};

  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-weight: ${({ weight }) => weight ?? ''};
  color: ${({ color }) => color || colors.input};

  transition: all 200ms ease;
  transform: ${({ isStatic, isFocused, isEmpty }) =>
    (!isStatic && isFocused && isEmpty) || (!isStatic && !isEmpty)
      ? `translate(-4px, 140%) scale(0.9)`
      : 'none'};

  width: ${({ isStatic, isFocused, isEmpty }) =>
    (!isStatic && isFocused && isEmpty) || (!isStatic && !isEmpty)
      ? ''
      : 'calc(100% - 12px)'};

  margin: 0;
  padding: 0 5px;
  border-radius: 2px;

  user-select: none !important;
  display: block;
`;

interface Input {
  isReadOnly?: boolean;
  noRecolor?: boolean;
  validated?: boolean;
  inputWidth?: string;
  block?: boolean;
  isValid?: boolean;
  color?: string;
  textSize?: number;
  disabled?: boolean;
  isDirty?: boolean;
  alignToRight: boolean;
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
  letterSpacing?: number;
  recolorOnAutofill: boolean;
}

const StyledInput = (props: Input) => `
  position: relative;

  padding: 12px;

  width: ${props.block ? '100%' : props.inputWidth || 'auto'};

  background-color: ${
    props.disabled && !props.noRecolor ? colors.primaryShadow : colors.white
  };

  color: ${props.color || colors.input};
  font-size: ${props.textSize || '16px'};
  letter-spacing: 0.6px;
  font-weight: ${props.fontWeight || 'normal'};
  letter-spacing: ${props.letterSpacing || 'normal'};
  text-align: ${props.alignToRight ? 'end' : 'unset'};

  border-radius: 10px;
  border: none;
  outline: none !important;

  transition: all 150ms ease;

  // &:invalid {
  //   border: ${
    props.validated ? `1.7px solid ${colors.invalidBorder}` : 'none'
  };
  // }

  cursor: ${props.isReadOnly ? 'unset' : 'text'};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px
      ${props.recolorOnAutofill ? 'auto' : colors.white}
      inset !important;
    -webkit-box-shadow: 0 0 0px 1000px
      ${props.recolorOnAutofill ? 'auto' : colors.white}
      inset !important;
  }
`;

export const Input = styled.input<Input>`
  ${(props) => StyledInput(props)}
`;

export const FormattedInput = styled(
  ({
    isReadOnly: _isReadOnly,
    noRecolor: _noRecolor,
    validated: _validated,
    inputWidth: _inputWidth,
    block: _block,
    isValid: _isValid,
    color: _color,
    textSize: _textSize,
    disabled: _disabled,
    isDirty: _isDirty,
    alignToRight: _alignToRight,
    fontWeight: _fontWeight,
    letterSpacing: _letterSpacing,
    recolorOnAutofill: _recolorOnAutofill,
    flexColumn: _flexColumn,
    ...rest
  }: Input & NumberFormatProps) => <NumberFormat {...rest} />,
)<Input>`
  ${(props) => StyledInput(props)}
`;

interface PrependedContainer {
  margin: string;
  color?: string;
}
export const PrependedContainer = styled.div<PrependedContainer>`
  margin: ${({ margin }) => margin || '0 12px'};
  color: ${({ color }) => color || 'auto'};
`;

interface AppendedContainer {
  margin: string;
  color?: string;
}
export const AppendedContainer = styled.div<AppendedContainer>`
  margin: ${({ margin }) => margin || '0 12px'};
  color: ${({ color }) => color || 'auto'};
`;
