import React, { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';

import { Product } from '../../interfaces/product';
import { colors } from '../../styles/colors';
import { formatCurrency, removeFormatting } from '../../utils/formatCurrency';

import Button from '../General/Button';
import Combobox from '../General/Inputs/Combobox';
import Input from '../General/Inputs/Input';
import { confirmModal } from '../General/Modal';

import {
  StyledTable,
  Container,
  TableContainer,
  Th,
  Td,
  Footer,
  QuantityContainer,
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
        const value = removeFormatting(curr.value);
        if (curr.quantity > 0) {
          const totalValue = value * curr.quantity + acc;
          return totalValue;
        }

        return 0;
      }, 0),
    );
  }, [products]);

  const handleRemove = (id: string, name: string) => {
    const content = {
      title: 'Remover produto',
      footless: true,
      content: (
        <p>
          Deseja exluir <strong>{name}</strong> da lista de compras?
        </p>
      ),
    };

    confirmModal(content).then((confirmation) => {
      if (confirmation) onRemove(id);
    });
  };

  const handleQtd = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;

    const product = Object.entries(products).filter(([id, product]) => {
      if (id === value) return product;
    })[0][1];

    if (name === 'add') {
      onQtdChange(value, product.quantity + 1);
    } else if (name === 'sub') {
      if (product.quantity - 1 > 0) {
        onQtdChange(value, product.quantity - 1);
      } else {
        handleRemove(value, product.name);
      }
    }
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
          <Th width="10%" alignment="center">
            Quantidade
          </Th>
        </tr>
      </thead>
      <tbody>
        {!isLoading &&
          Object.entries(products).map(([id, product]) => (
            <tr key={id}>
              <Td />
              <Td>{product.name}</Td>
              <Td>R$ {product.value}</Td>
              <Td>
                <QuantityContainer>
                  <Button
                    text=""
                    name="sub"
                    value={id}
                    icon={icons.circledSubtract}
                    onClick={handleQtd}
                    styless
                  />
                  <Input
                    type="number"
                    name="quantity"
                    width="80px"
                    min={0}
                    onChange={() => {}}
                    value={product.quantity}
                  />
                  <Button
                    text=""
                    name="add"
                    value={id}
                    onClick={handleQtd}
                    icon={icons.circledAdd}
                    styless
                  />
                </QuantityContainer>
              </Td>
            </tr>
          ))}
      </tbody>
      <Footer>
        <tr>
          <Td />
          <Td>Total</Td>
          <Td align="left">{formatCurrency(total)}</Td>
          <Td align="left">
            <Button
              name="submit"
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
