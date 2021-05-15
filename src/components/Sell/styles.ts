import styled from 'styled-components';
import { StyledScrollX } from '../../styles';
import { colors } from '../../styles/colors';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const TableContainer = styled.div`
  background-color: ${colors.white};
  padding: 8px 4px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2), 0 25px 30px rgba(0, 0, 0, 0.2);

  border-radius: 10px;
  margin-top: 5em;
`;

interface Th {
  alignment?: string;
  width: string;
}

export const Th = styled.th<Th>`
  width: ${({ width }) => width};
  text-align: ${({ alignment }) => alignment || 'center'};
  font-size: 16px !important;
  font-weight: 500 !important;
  color: ${colors.tableHeader} !important;
  padding: 0 12px 18px 12px;
`;

interface Td {
  align?: string;
  thin?: boolean;
}

/* text-align: ${({ alignment }) => alignment || 'left'}; */
export const Td = styled.td<Td>`
  font-size: 14px !important;
  padding: 6px 12px;
  color: ${colors.offerInfoText} !important;
  font-weight: ${({ thin }) => (thin ? 'normal' : '600')};

  text-align: ${({ align }) => align ?? null};

  &:first-child {
    width: 42px;
  }

  a {
    color: ${colors.offerInfoText};
    transition: color 100ms ease;

    &.value-column {
      display: flex;
      justify-content: space-between;

      svg {
        margin: 0 3px;
      }
    }

    &:hover {
      color: ${colors.orderRowHover} !important;
      transition: color 50ms ease;
    }
  }
`;

export const Footer = styled.tfoot`
  border-top: 0.1px solid ${colors.darkTableRow};

  padding: 2em 0;

  td {
    padding: 2em 12px 1em 1em;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
