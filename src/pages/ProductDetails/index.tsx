import React from 'react';
import { useParams } from 'react-router-dom';
import BasePage from '../../components/General/BasePage';
import ProductDetails from '../../components/Product/ProductDetails';
import { useSWRHook } from '../../services';

interface Params {
  id: string;
}

const Product: React.FC = () => {
  const { id } = useParams<Params>();

  const { data } = useSWRHook([`/product/${id}`, null]);

  return (
    <BasePage
      title="Detalhes do Produto"
      caretPath={[
        {
          title: 'Detalhes do Produto',
          path: '/product/:id',
        },
      ]}
    >
      <ProductDetails data={data?.product} />
    </BasePage>
  );
};

export default Product;
