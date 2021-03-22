import styled from 'styled-components';
import { StyledScrollY } from '../../../../styles';
import { colors } from '../../../../styles/colors';
import { OptionContainer } from './Option';

interface Container {
  block?: boolean;
  largestOption: number;
  areaName?: string;
}

export const Container = styled.div<Container>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  grid-area: ${({ areaName }) => areaName ?? ''};

  width: ${({ block }) => (block ? '100%' : 'fit-content')};
  min-width: ${({ largestOption }) => largestOption + 6}ch;
  & > * {
    font-family: 'Accord Alternate';
    color: ${colors.input};
  }
`;

interface OptionsContainer {
  isVisible: boolean;
  largestOption: number;
}

export const OptionsContainer = styled.div<OptionsContainer>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;

  ${StyledScrollY};

  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${colors.dropdownBackground};
  border-radius: 0 0 10px 10px;

  overflow-x: hidden;
  overflow-y: auto;

  transition: height 1s ease-in-out;

  min-width: ${({ largestOption }) => largestOption + 6}ch;
  max-height: ${({ isVisible }) => (isVisible ? '200px' : '0px')};
`;

interface SelectContainer {
  isOpen: boolean;
  largestOption: number;
  bold?: boolean;
  disabled?: boolean;
  block?: boolean;
  isValid?: boolean;
  paddingUpDown?: number;
  paddingRightLeft?: number;
  readOnly?: boolean;
}

export const Button = styled.button<SelectContainer>`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${({ paddingUpDown, paddingRightLeft }) =>
    `${paddingUpDown ?? 10}px ${paddingRightLeft ?? 18}px`};
  border-radius: 10px 10px ${({ isOpen }) => (isOpen ? '0 0' : '')};

  background-color: ${({ disabled }) =>
    disabled ? colors.primaryShadow : colors.background};

  font-size: 16px;
  outline: none !important;
  transition: all 150ms ease;

  svg {
    transition: transform 100ms ease-in-out;
    margin-left: 12px;

    transform: rotate(${({ isOpen }) => (isOpen ? '-180' : '0')}deg);
  }

  &,
  ${OptionContainer} {
    border: 1.7px solid
      ${({ isValid }) => (isValid ? 'transparent' : colors.invalidBorder)};
  }

  &,
  ${OptionContainer} {
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  }

  &:hover,
  &:focus {
    box-shadow: ${({ disabled, isValid }) =>
      disabled
        ? 'none'
        : `0 0 0 4px
      ${isValid ? colors.primaryShadow : `${colors.invalidBorder}33`}`};
  }
`;

interface Label {
  color?: string;
  fontSize?: string;
}

export const Label = styled.label<Label>`
  left: 13px;

  font-size: ${({ fontSize }) => fontSize || '1rem'};
  color: ${({ color }) => color || colors.input};

  transition: all 200ms ease;

  margin: 0;
  padding: 0 5px;
  border-radius: 2px;

  user-select: none !important;
`;

export const StyledOption = styled.option``;

export const StyledSelect = styled.select<SelectContainer>`
  ${StyledScrollY};

  -webkit-appearance: none;
  -moz-appearence: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
    no-repeat;
  background-position: right center;

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: ${({ paddingUpDown, paddingRightLeft }) =>
    `${paddingUpDown ?? 12}px ${paddingRightLeft ?? 18}px`};

  border-radius: 10px 10px ${({ isOpen }) => (isOpen ? '0 0' : '')};

  background-color: ${({ disabled }) =>
    disabled ? colors.primaryShadow : colors.background};

  font-size: 16px;
  outline: none !important;
  transition: all 150ms ease;

  svg {
    transition: transform 100ms ease-in-out;
    margin-left: 12px;

    transform: rotate(${({ isOpen }) => (isOpen ? '-180' : '0')}deg);
  }

  &,
  ${StyledOption} {
    border: 1.7px solid
      ${({ isValid }) => (isValid ? 'transparent' : colors.invalidBorder)};
  }

  &,
  ${StyledOption} {
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  }

  &:hover,
  &:focus {
    box-shadow: ${({ disabled, isValid }) =>
      disabled
        ? 'none'
        : `0 0 0 4px
        ${isValid ? colors.primaryShadow : `${colors.invalidBorder}33`}`};
  }
`;
