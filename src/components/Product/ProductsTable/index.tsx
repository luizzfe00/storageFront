import React, { useState } from 'react';

import { icons } from '../../../assets/icons';
import { ProductForm as ProductFormInterface } from '../../../interfaces/product';
import { api, useFetch } from '../../../services';
import { colors } from '../../../styles/colors';
import Button from '../../General/Button';
import Input from '../../General/Inputs/Input';
import { confirmModal, infoModal } from '../../General/Modal';

import ProductForm from '../ProductForm';
import ProductRow from '../ProductRow';

import {
  PageContainer,
  PageHeader,
  Header,
  TableContainer,
  Table,
  Th,
  Body,
  ButtonsContainer,
} from './styles';

export interface PropsQuery {
  [key: string]: string | boolean | PropsQuery;
}

export type Mutate = (
  data?: any,
  shouldRevalidate?: boolean | undefined,
) => Promise<any>;

interface ProductsTable {
  items: any;
  receivedResponse?: boolean;
  query: PropsQuery;
  mutate?: Mutate;
  count: number;
}

const alignments = ['', 'left', 'left'];

const ProductsTable: React.FC<ProductsTable> = ({
  items,
  count,
  query,
  receivedResponse,
  mutate,
}: ProductsTable) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  const headerItens = [
    { text: '', width: '3%' },
    { text: 'Código', width: '20%' },
    { text: 'Produto', width: '25%' },
    { text: 'Quantidade', width: '8%' },
    { text: 'Valor', width: '20%' },
    { text: 'Ativo', width: '10%' },
    { text: 'Atualizado em', width: '20%' },
    { text: 'Ações', width: '10%' },
  ];

  const renderTable = () => {
    return items.map((product: ProductFormInterface, index: number) => (
      <ProductRow
        key={`product${index + 1}`}
        mutate={mutate}
        product={product}
        setLoading={() => undefined}
        isDark={!(index % 2)}
      />
    ));
  };

  const renderNoItems = () => {
    if (receivedResponse)
      return (
        <tr>
          <td colSpan={8} className="text-center">
            <h4>Nenhum pedido encontrado.</h4>
          </td>
        </tr>
      );
  };

  return (
    <PageContainer>
      {showProductForm && (
        <ProductForm onHide={() => setShowProductForm(false)} />
      )}
      <PageHeader>
        <span>
          <h3>Pedidos Encontrados: {count}</h3>
        </span>
        <ButtonsContainer>
          {showSearch ? (
            <Input prepend prependedColor={colors.link}>
              {icons.search}
            </Input>
          ) : (
            <Button
              text="Buscar"
              styless
              icon={icons.search}
              color={colors.link}
              onClick={() => setShowSearch(true)}
            />
          )}

          <Button
            text="Criar Produto"
            styless
            icon={icons.add}
            color={colors.link}
            onClick={() => setShowProductForm(true)}
          />
        </ButtonsContainer>
      </PageHeader>
      <TableContainer>
        <Table>
          <Header>
            <tr>
              {headerItens.map(({ text, width }, index) => (
                <Th
                  key={`orderTableHead#${text}`}
                  alignment={alignments[index] ?? 'center'}
                  width={width}
                >
                  {text}
                </Th>
              ))}
            </tr>
          </Header>
          <Body>{items.length ? renderTable() : renderNoItems()}</Body>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default ProductsTable;
