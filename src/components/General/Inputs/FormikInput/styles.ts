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
  borderRadius?: string;
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
  block?: boolean;
  inputWidth?: string;
  disabled?: boolean;
  noRecolor?: boolean;
  color?: string;
  textSize?: number;
  fontWeight?: string;
  letterSpacing?: string;
  alignToRight?: boolean;
  readonly?: boolean;
  reColorOnAutoFill?: boolean;
}

export const InputContainer = styled.div<InputContainer>`
  position: relative;

  width: ${({ block }) => (block ? '100%' : 'fit-content')};

  display: flex;
  align-items: center;

  input {
    position: relative;

    padding: 12px;

    width: ${({ block, inputWidth }) =>
      block ? '100%' : inputWidth || 'auto'};

    background-color: ${({ disabled, noRecolor }) =>
      disabled && !noRecolor ? colors.primaryShadow : colors.white};

    color: ${({ color }) => color || colors.input};
    font-size: ${({ textSize }) => textSize || '16px'};
    letter-spacing: 0.6px;
    font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
    letter-spacing: ${({ letterSpacing }) => letterSpacing || 'normal'};
    text-align: ${({ alignToRight }) => (alignToRight ? 'end' : 'unset')};

    border-radius: 10px;
    border: none;
    outline: none !important;

    transition: all 150ms ease;

    cursor: ${({ readonly }) => (readonly ? 'unset' : 'text')};

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      box-shadow: 0 0 0px 1000px
        ${({ reColorOnAutoFill }) =>
          reColorOnAutoFill ? 'auto' : colors.white}
        inset !important;
      -webkit-box-shadow: 0 0 0px 1000px
        ${({ reColorOnAutoFill }) =>
          reColorOnAutoFill ? 'auto' : colors.white}
        inset !important;
    }
  }
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
  alignToRight?: boolean;
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
  recolorOnAutofill?: boolean;
}

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

export const ErrorContainer = styled.span`
  color: ${colors.invalidBorder};
  padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
`;
