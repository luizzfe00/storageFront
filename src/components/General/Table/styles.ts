// import { StyledScrollX } from '../../../styles';
import { lighten } from 'polished';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  padding-bottom: 16px;
  min-height: 400px;
`;

export const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const HeaderContainer = styled.thead`
  border-bottom: 1px solid ${colors.inputBorder};
  border-top: 1px solid ${colors.inputBorder};

  th {
    font-size: 16px !important;
    font-weight: 500 !important;
    letter-spacing: 1px !important;
    line-height: 25px !important;
    color: ${colors.tableHeader} !important;
    padding: 8px 8px;
    min-width: 160px;
    text-align: left;
  }

  & th:first-child {
    padding-left: 0;
  }

  & th:last-child {
    padding-right: 0;
  }

  th.align-center {
    text-align: center;
  }

  th.fit-content {
    min-width: fit-content;
  }
`;

export const AllRowsContainer = styled.tbody``;

export const RowContainer = styled.tr`
  &:first-child td {
    padding-top: 10px;
  }

  td {
    color: ${colors.input};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.6px;
    line-height: 15px;
    padding: 6px 8px;
    min-width: 160px;
    border-bottom: 1px solid ${colors.inputBorder};
  }

  & td:last-child {
    padding-right: 0;
  }

  td.align-center {
    text-align: center;
  }

  td.fit-content {
    min-width: fit-content;
  }

  :hover {
    background-color: ${colors.offerInfoBackground};
  }
`;

interface ActionButton {
  color?: string;
  disabled?: boolean;
}

export const ActionButton = styled.button<ActionButton>`
  border: none;
  padding: 12px;
  border-radius: 5px;
  transition: all ease-in-out 300ms;
  background-color: ${({ color, disabled }) =>
    disabled
      ? color
        ? lighten(0.25, color)
        : lighten(0.25, colors.primary)
      : color || colors.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  /* width: 44px; */
  height: 44px;

  svg {
    color: ${colors.white};
    width: 20px;
    height: 20px;
  }

  span {
    color: ${colors.white};
  }

  margin-left: 8px;

  &:hover {
    ${({ color, disabled }) =>
      disabled
        ? ''
        : `background-color: ${
            color ? lighten(0.1, color) : lighten(0.1, colors.primary)
          }`}
  }

  &:first-child {
    margin-left: 0;
  }
`;
