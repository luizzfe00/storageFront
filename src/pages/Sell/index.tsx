import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { icons } from '../../assets/icons';
import BasePage from '../../components/General/BasePage';
import SellForm from '../../components/Sell';

import { useSWRHook } from '../../services';
import { colors } from '../../styles/colors';

export interface PropsQuery {
  [key: string]: string | boolean | PropsQuery;
}

const INITIAL_QUERY = {
  name: '',
  code: '',
};

const PAGE_SIZE = 8;

const Sell: React.FC = () => {
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
      title="Venda"
      caretPath={[
        {
          title: 'Venda',
          path: '/sell',
        },
      ]}
    >
      <SellForm products={data?.data?.items} />
    </BasePage>
  );
};

export default Sell;
