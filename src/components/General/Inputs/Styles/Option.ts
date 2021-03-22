import { darken } from 'polished';
import styled from 'styled-components';
import { colors } from '../../../../styles/colors';

export const OptionContainer = styled.button`
  display: flex;
  justify-content: flex-start;

  width: 100%;
  border: none;
  padding: 12px 0 12px 18px;

  color: ${colors.input};
  background-color: ${colors.dropdownBackground};

  outline: none !important;
  transition: background-color 100ms ease-in-out;

  &:hover,
  &:active,
  &:focus {
    background-color: ${darken(0.1, colors.background)};
  }
`;
