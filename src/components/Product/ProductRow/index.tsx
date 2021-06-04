import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { icons } from '../../../assets/icons';

import { Mutate } from '../../../interfaces';
import { Product } from '../../../interfaces/Product';
import { colors } from '../../../styles/colors';
import { formatCurrency } from '../../../utils/formatCurrency';

import Button from '../../General/Button';
import Dropdown from '../../General/Dropdown';

import { Row } from '../ProductsTable/styles';

import { Td, OrderValue } from './styles';

interface ProductRow {
  product: Product;
  isDark: boolean;

  mutate?: Mutate;
  setLoading: (prev?: any) => void | undefined;
}

const OrderRow: React.FC<ProductRow> = ({
  product,
  isDark,

  mutate,
  setLoading,
}: ProductRow) => {
  const history = useHistory();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleCloseDropdown = () => setShowDropdown(false);

  const handleDetails = () => {
    history.push(`/product/${product.id}`);
  };

  return product ? (
    <>
      <Row isDark={isDark}>
        <Td></Td>
        <Td>{product.code}</Td>
        <Td>{product.name}</Td>
        <Td align="center">{product.quantity}</Td>
        <Td align="center">
          <OrderValue>{formatCurrency(product.value)}</OrderValue>
        </Td>
        <Td align="center">
          {product.active ? icons.checkCircle : icons.checkCircleOff}
        </Td>
        <Td align="center" thin>
          {product.updatedAt}
        </Td>

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
            <Dropdown.DropdownItem onClick={handleDetails}>
              {icons.listMenu} Ver detalhes
            </Dropdown.DropdownItem>
            <Dropdown.DropdownItem onClick={() => {}}>
              {icons.pencil} Editar
            </Dropdown.DropdownItem>
          </Dropdown.Dropdown>
        </Td>
      </Row>
    </>
  ) : null;
};

export default OrderRow;
