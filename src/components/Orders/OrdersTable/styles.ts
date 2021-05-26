import styled from 'styled-components';
import { StyledScrollX } from '../../../styles';
import { colors } from '../../../styles/colors';

interface Row {
  isDark?: boolean;
}

export const Row = styled.tr<Row>`
  background-color: ${({ isDark }) => (isDark ? colors.darkTableRow : 'white')};

  &.skeletonRow:nth-child(odd) .react-loading-skeleton {
    background-color: ${colors.backgroundRow};

    background-image: linear-gradient(
      90deg,
      ${colors.backgroundRow},
      white,
      ${colors.backgroundRow}
    );
  }

  .rounded {
    border-radius: 16px;
  }

  .expand-button {
    margin: 0 auto;
  }

  .payment-type {
    button {
      display: inline;
      margin: 0;
    }

    .payment-type--icon {
      fill: ${colors.success};
      font-size: 25px;
    }
  }

  .product-status {
    text-align: center;
  }

  .actions {
    display: flex;
    border: 0;
    padding: 0;

    svg {
      font-size: 16px;
      color: ${colors.tableHeader};
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }

  .left-expand {
    text-align: center;
    button {
      margin: auto;
    }

    svg {
      font-size: 24px;
    }
  }

  > :first-child {
    padding-left: 3em;
  }
`;

export const PageContainer = styled.div`
  padding: 32px 0 0;
  background-color: ${colors.white};
  color: ${colors.darkerSecondary};
  border-radius: 10px;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  padding-bottom: 16px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2), 0 25px 30px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  ${StyledScrollX}
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 16px 32px;

  h3 {
    font-size: 16px;
  }

  @media screen and (max-width: 425px) {
    display: grid;
    grid-template-columns: 1fr;

    gap: 16px;

    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Header = styled.thead``;

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
  padding: 8px 12px 18px 12px;
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

export const Body = styled.tbody`
  /* > :nth-child(odd) {
    background-color: ${colors.darkTableRow};
  } */

  .order-expand-button {
    height: 27px;
    width: 27px;
  }
`;

interface OrderContainer {
  className?: string;
}

export const OrderContainer = styled(Row).attrs(
  ({ className = '' }: OrderContainer) => ({
    className: `order--container ${className}`.trim(),
  }),
)`
  background-color: ${colors.offWhite} !important;

  th:first-child {
    width: 42px;
  }

  .right-side-content--container {
    height: 0;
    padding: 0;
  }

  &.thead {
    padding: 12px 8px 7px;

    color: ${colors.orderThead};
    font-size: 13px;
    font-weight: 400;

    :hover {
      background: ${colors.offWhite} !important;
    }

    th {
      font-weight: 500 !important;
      font-size: 14px !important;
      color: ${colors.orderTheadTh} !important;
    }
  }
`;

interface StatusColor {
  color: string;
  hoverColor: string;
}

export const Status = styled.span<StatusColor>`
  border-radius: 16px;
  padding: 8px 12px;
  background-color: ${({ color }) => color};
  font-weight: 600;
  color: ${colors.white};
  white-space: nowrap;
  user-select: none;
  transition: all 200ms;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

interface RightSideContentContainer {
  hasOrderBump?: boolean;
}

export const RightSideContentContainer = styled.div<RightSideContentContainer>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: ${({ hasOrderBump }) => (hasOrderBump ? '0px' : '15px')};

  border: 1px solid ${colors.offWhite};
  border-radius: 5px;

  background-color: ${colors.offBlack};

  color: white;

  div {
    display: inherit;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    margin: 0 10px;
    height: 100%;
    width: 40%;

    span {
      font-size: 14px;
    }
  }

  .total-paid {
    color: ${colors.success};
    font-size: 16px;
    font-weight: bold;
  }

  .moip-reference {
    font-size: 12px;
  }
`;

interface ActionLink {
  disabled?: boolean;
}

export const ActionLink = styled.a.attrs(({ disabled }: ActionLink) => ({
  className: `dropdown-item ${disabled ? ' disabled' : ''}`,
}))<ActionLink>`
  &&& {
    color: ${({ disabled }) =>
      disabled ? `${colors.modalBackground} !important` : ''};
  }
`;

export const WhatsappButton = styled.button.attrs(
  ({ disabled }: ActionLink) => ({
    className: `dropdown-item ${disabled ? ' disabled' : ''}`,
  }),
)<ActionLink>`
  &&& {
    color: ${({ disabled }) =>
      disabled ? `${colors.modalBackground} !important` : ''};
  }
  &:hover {
    color: ${colors.orderRowHover};
  }
  &:focus {
    background-color: ${colors.orderRowHover};
    border: none;
    outline: none;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;

  button {
    width: max-content;

    svg {
      width: 16px;
      height: 16px;
      margin-left: 1.4em;
    }
  }

  @media screen and (max-width: 425px) {
    width: 100%;
  }
`;
