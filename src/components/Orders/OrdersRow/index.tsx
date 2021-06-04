import React, { useState } from 'react';
import { icons } from '../../../assets/icons';

import { Product } from '../../../interfaces/Product';
import { colors } from '../../../styles/colors';
import { formatCurrency } from '../../../utils/formatCurrency';

import Button from '../../General/Button';
import Dropdown from '../../General/Dropdown';

import { Row } from '../OrdersTable/styles';

import { Td, OrderValue } from './styles';

interface ProductRow {
  order: any;
  isDark: boolean;

  setLoading: (prev?: any) => void | undefined;
}

const OrderRow: React.FC<ProductRow> = ({
  order,
  isDark,

  setLoading,
}: ProductRow) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleCloseDropdown = () => setShowDropdown(false);

  return order ? (
    <>
      <Row isDark={isDark}>
        <Td></Td>
        <Td>{order.product}</Td>
        <Td align="center">{order.quantity}</Td>
        <Td align="center">
          <OrderValue>{formatCurrency(order.value)}</OrderValue>
        </Td>
        <Td align="center">
          {order.method === 1 ? icons.creditCard : icons.barCode}
        </Td>
        <Td align="center" thin>
          {order.status}
        </Td>
        <Td>{order.created_at}</Td>

        <Td align="center">
          <Dropdown.Dropdown
            isOpen={showDropdown}
            onClose={handleCloseDropdown}
            toggler={
              <Button
                text=""
                paddingRightLeft={0}
                paddingUpDown={0}
                backgroundColor={colors.white}
                color={colors.darkerSecondary}
                borderColor={colors.lightGrayBorder}
                onClick={toggleDropdown}
                icon={icons.verticalDots}
                iconOnly
                marginAuto
              />
            }
          >
            <Dropdown.DropdownItem onClick={() => {}}>
              {icons.listMenu} Ver detalhes
            </Dropdown.DropdownItem>
          </Dropdown.Dropdown>
        </Td>
      </Row>
    </>
  ) : null;
};

export default OrderRow;
