import styled from 'styled-components';
import { colors } from '../../../styles/colors';

interface Td {
  align?: string;
  thin?: boolean;
}

export const Td = styled.td<Td>`
  font-size: 14px !important;
  padding: 6px 12px;
  color: ${colors.offerInfoText} !important;
  font-weight: ${({ thin }) => (thin ? 'normal' : '600')};

  text-align: ${({ align }) => align ?? null};

  &:first-child {
    width: 42px;

    padding: 0;
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

export const OrderOriginContainer = styled.div`
  display: grid;
  align-items: center;
  gap: 2px;
  grid-template-rows: repeat(auto-fit, minmax(14px, 1fr));
`;

export const OrderValue = styled.div``;

export const PaymentMethodContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  * {
    margin: 0 3px;
  }

  button {
    letter-spacing: 0px;
    line-height: 1;
  }
`;

export const DescriptionContainer = styled.small`
  display: grid;
  grid-template-columns: 60px auto;

  span {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;

export const ValueAndSourceContainer = styled.span`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4px 8px;
  align-items: center;
`;
