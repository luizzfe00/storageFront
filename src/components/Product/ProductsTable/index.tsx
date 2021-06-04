import React, { useState } from 'react';

import { icons } from '../../../assets/icons';
import { Product } from '../../../interfaces/Product';
import { colors } from '../../../styles/colors';
import Button from '../../General/Button';
import Input from '../../General/Inputs/Input';

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
    return items.map((product: Product, index: number) => (
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
      <PageHeader>
        <span>
          <h3>Produtos Encontrados: {count}</h3>
        </span>
        <ButtonsContainer>
          {showSearch ? (
            <Input name="search" prepend prependedColor={colors.link}>
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
