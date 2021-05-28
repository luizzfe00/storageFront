import { darken } from 'polished';
import styled from 'styled-components';
import { StyledScrollY } from '../../../../styles';
import { colors } from '../../../../styles/colors';

interface Container {
  block: boolean;
  maxWidth?: string;
}

const Container = styled.div<Container>`
  width: ${({ block, maxWidth = '' }) =>
    block && !maxWidth ? '100%' : maxWidth};
  position: relative;
  z-index: 50;

  .dropdown-menu {
    opacity: 1 !important;
    width: 100% !important;
    position: unset !important;

    max-height: 200px;
    overflow-y: auto;
    ${StyledScrollY}

    top: unset !important;
    right: 0;

    pointer-events: all !important;

    transition: background-color 300ms ease;

    background-color: ${colors.lightButton};

    .dropdown-item {
      padding: 0.5rem 1.5rem;
      width: 100% !important;
    }
  }
`;

export default Container;

export const Dropdown = styled.div``;

interface DropdownMenu {
  isOpen: boolean;
  noTranslate?: boolean;
}

export const DropdownMenu = styled.div<DropdownMenu>`
  opacity: 1 !important;
  position: absolute;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  top: unset !important;
  right: 0;
  pointer-events: all !important;
  transition: background-color 300ms ease;
  background-color: ${colors.lightButton};

  left: ${({ noTranslate }) => (noTranslate ? '' : '16px')};
  right: ${({ noTranslate }) => (noTranslate ? '' : '16px')};

  border-radius: 0 0 8px 8px;

  display: ${({ isOpen }) => (isOpen ? 'unset' : 'none')};
  ${StyledScrollY};
`;

interface DropdownItem {
  disabled: boolean;
}

export const DropdownItem = styled.button<DropdownItem>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

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
