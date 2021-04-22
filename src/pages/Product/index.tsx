import React from 'react';
import BasePage from '../../components/General/BasePage';
import ProductsTable from '../../components/Product/ProductsTable';

const Product: React.FC = () => {
  return (
    <BasePage title="Produtos">
      <ProductsTable />
    </BasePage>
  );
};

export default Product;
