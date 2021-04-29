import React, { useState } from 'react';
import { icons } from '../../../assets/icons';

import { Mutate } from '../../../interfaces';
import { Product } from '../../../interfaces/product';

import { api, useSWRHook } from '../../../services';

import { colors } from '../../../styles/colors';
import Button from '../../General/Button';
import Dropdown from '../../General/Dropdown';
import { infoModal } from '../../General/Modal';

import { Row } from '../ProductsTable/styles';

import { Td, OrderValue, ValueAndSourceContainer } from './styles';

interface Status {
  status: number;
}

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
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleCloseDropdown = () => setShowDropdown(false);

  const onOpenProduct = () => {
    console.log(product.id);
  };

  return product ? (
    <>
      <Row isDark={isDark}>
        <Td></Td>
        <Td>{product.code}</Td>
        <Td>{product.name}</Td>
        <Td align="center">{product.quantity}</Td>
        <Td align="center">
          <OrderValue>R$ {product.value}</OrderValue>
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
            <Dropdown.DropdownItem onClick={onOpenProduct}>
              {icons.listMenu} Ver detalhes
            </Dropdown.DropdownItem>
          </Dropdown.Dropdown>
        </Td>
      </Row>
    </>
  ) : null;
};

export default OrderRow;
