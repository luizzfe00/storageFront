import React, { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';

import { Product } from '../../interfaces/product';
import { colors } from '../../styles/colors';

import Button from '../General/Button';
import Combobox from '../General/Inputs/Combobox';
import Input from '../General/Inputs/Input';

import {
  StyledTable,
  Container,
  TableContainer,
  Th,
  Td,
  Footer,
} from './styles';

interface Props {
  products: any;
}

interface Products {
  [id: string]: Product;
}

const SellForm: React.FC<Props> = ({ products }) => {
  const [productQuery, setProductQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Products>({});

  const handleProductQuery = (newValue: string) => {
    setProductQuery(newValue);
  };

  const comboBoxPlaceholder = productQuery
    ? 'Nenhum produto encontrado com este nome'
    : 'Insira o nome do produto';

  const queriedProducts: Product[] = productQuery
    ? products?.map((product: Product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(productQuery.toLowerCase());
        const alreadySelected = Object.keys(selectedProducts).includes(
          String(product.id),
        );

        return nameMatch && !alreadySelected;
      })
    : products?.filter(
        (product: Product) =>
          !Object.keys(selectedProducts).includes(String(product.id)),
      );

  const handleSelectProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value: id } = event.currentTarget;

    const product =
      products.filter((product: Product) => product.id === id)[0] ?? [];

    setSelectedProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        name: product.name,
        value: product.value,
        quantity: 1,
      },
    }));
  };

  const onRemoveProduct = (productID: string) => {
    const { [productID]: _, ...filtered } = selectedProducts;

    setSelectedProducts(filtered);
  };

  const handleChangeQuantity = (id: string, value: number) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: value,
      },
    }));
  };

  return (
    <Container>
      <Combobox
        title="Pesquise os produtos pelo seus nomes"
        valueProp="id"
        noResultPlaceholder={comboBoxPlaceholder}
        elements={queriedProducts ?? []}
        onChange={handleProductQuery}
        onSelect={handleSelectProduct}
      />
      <TableContainer>
        <Table
          products={selectedProducts}
          onQtdChange={handleChangeQuantity}
          onRemove={onRemoveProduct}
        />
      </TableContainer>
    </Container>
  );
};

interface Table {
  products: Products;
  isLoading?: boolean;

  onRemove: (id: string) => void;
  onQtdChange: (id: string, value: number) => void;
}

const Table: React.FC<Table> = ({
  onQtdChange,
  onRemove,
  products,
  isLoading,
}: Table) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      Object.values(products).reduce((acc, curr) => {
        const value = Number(curr.value.replace(',', '.'));
        if (curr.quantity > 0) {
          const totalValue = value * curr.quantity + acc;
          return totalValue;
        }

        return 0;
      }, 0),
    );
  }, [products]);

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    onRemove(value);
  };

  const handleQtd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: id, value } = event.target;

    onQtdChange(id, Number(value));
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <Th width="3%" />
          <Th width="25%" alignment="left">
            Nome
          </Th>
          <Th width="20%" alignment="left">
            Valor
          </Th>
          <Th width="10%" alignment="left">
            Quantidade
          </Th>
        </tr>
      </thead>
      <tbody>
        {!isLoading &&
          Object.values(products).map((product) => (
            <tr key={product.id}>
              <Td />
              <Td>{product.name}</Td>
              <Td>R$ {product.value}</Td>
              <Td align="center">
                <Button text="" name="add" icon={icons.checkCircle} styless />
                <Input
                  width="60px"
                  type="number"
                  disabled
                  name={product.id}
                  value={product.quantity}
                  onChange={handleQtd}
                />
                <Button
                  text=""
                  name="sub"
                  icon={icons.checkCircleOff}
                  styless
                />
              </Td>
            </tr>
          ))}
      </tbody>
      <Footer>
        <tr>
          <Td />
          <Td>Total</Td>
          <Td align="left">R$ {total}</Td>
          <Td align="left">
            <Button
              text="Confirmar"
              backgroundColor={colors.confirmButton}
              paddingRightLeft={48}
              paddingUpDown={14}
            />
          </Td>
        </tr>
      </Footer>
    </StyledTable>
  );
};

export default SellForm;
