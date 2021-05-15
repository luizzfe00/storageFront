import React from 'react';
import { useParams } from 'react-router-dom';
import BasePage from '../../components/General/BasePage';
import ProductForm from '../../components/Product/ProductForm';
import { useSWRHook } from '../../services';

interface Params {
  id?: string;
}

const Product: React.FC = () => {
  const { id } = useParams<Params>();

  console.log(id);

  const { data } = useSWRHook(id ? [`/product/${id}`, null] : null);

  return (
    <BasePage
      title="Criar Produto"
      caretPath={[
        {
          title: 'Novo Produto',
          path: '/product',
        },
      ]}
    >
      <ProductForm product={data} />
    </BasePage>
  );
};

export default Product;
