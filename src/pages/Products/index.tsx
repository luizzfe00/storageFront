import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { icons } from '../../assets/icons';
import BasePage from '../../components/General/BasePage';
import ProductsTable from '../../components/Product/ProductsTable';

import { useSWRHook } from '../../services';
import { colors } from '../../styles/colors';
import { Header, Container } from './styles';

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

  const { data, mutate } = useSWRHook([`/product/all`, null]);

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
        <ProductsTable
          receivedResponse={!!data}
          count={data?.data.count ?? 0}
          items={data?.data.items ?? []}
          query={query}
          mutate={mutate}
        />
      </Container>
    </BasePage>
  );
};

export default Orders;
