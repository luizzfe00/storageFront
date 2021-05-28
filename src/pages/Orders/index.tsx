import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { icons } from '../../assets/icons';
import BasePage from '../../components/General/BasePage';
import OrdersTable from '../../components/Orders/OrdersTable';

import { useSWRHook } from '../../services';
import { colors } from '../../styles/colors';
import { Container } from './styles';

export interface PropsQuery {
  [key: string]: string | boolean | PropsQuery;
}

const INITIAL_QUERY = {
  name: '',
  code: '',
};

const PAGE_SIZE = 8;

const Orders: React.FC = () => {
  const [query, setQuery] = useState(INITIAL_QUERY);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const bodyQuery = {
    ...query,
    size: PAGE_SIZE,
    page: currentPage,
  };

  const data = {
    count: 5,
    items: [
      {
        product: 'Camiseta',
        quantity: 2,
        value: 100.0,
        method: 1,
        status: 1,
        createad_at: '2021-04-21',
      },
      {
        product: 'Short',
        quantity: 4,
        value: 80.0,
        method: 2,
        status: 2,
        createad_at: '2021-04-21',
      },
      {
        product: 'Cinto',
        quantity: 1,
        value: 40.0,
        method: 1,
        status: 3,
        createad_at: '2021-04-21',
      },
      {
        product: 'Blusa',
        quantity: 1,
        value: 100.0,
        method: 1,
        status: 4,
        createad_at: '2021-04-21',
      },
      {
        product: 'Sapato',
        quantity: 1,
        value: 400.0,
        method: 1,
        status: 1,
        createad_at: '2021-04-21',
      },
    ],
  };

  return (
    <BasePage
      title="Produtos"
      caretPath={[
        {
          title: 'Produtos',
          path: '/products',
        },
      ]}
    >
      <Container>
        <OrdersTable
          receivedResponse={!!data}
          count={data.count ?? 0}
          items={data.items ?? []}
          query={query}
        />
      </Container>
    </BasePage>
  );
};

export default Orders;
