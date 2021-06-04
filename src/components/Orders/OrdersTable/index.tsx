import React, { useState } from 'react';

import { icons } from '../../../assets/icons';
import { colors } from '../../../styles/colors';
import Button from '../../General/Button';
import Input from '../../General/Inputs/Input';

import OrdersRow from '../OrdersRow';

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

interface OrdersTable {
  items: any;
  receivedResponse?: boolean;
  query: PropsQuery;
  count: number;
}

const alignments = ['', 'left', 'left'];

const OrdersTable: React.FC<OrdersTable> = ({
  items,
  count,
  query,
  receivedResponse,
}: OrdersTable) => {
  const [showSearch, setShowSearch] = useState(false);

  const headerItens = [
    { text: '', width: '3%' },
    { text: 'Produto', width: '25%' },
    { text: 'Quantidade', width: '8%' },
    { text: 'Valor', width: '20%' },
    { text: 'Método de Pagamento', width: '10%' },
    { text: 'Status', width: '18%' },
    { text: 'Data da Compra', width: '20%' },
    { text: 'Ações', width: '10%' },
  ];

  const renderTable = () => {
    return items.map((order: any, index: number) => (
      <OrdersRow
        key={`product${index + 1}`}
        order={order}
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
          <h3>Pedidos Encontrados: {count}</h3>
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

export default OrdersTable;
