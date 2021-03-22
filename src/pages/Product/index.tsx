import React, { useState } from 'react';
import BasePage from '../../components/General/BasePage';
import ProductsTable from '../../components/Product/ProductsTable';
import { ValidatedData, initialMonetary, monetaryValidation } from './auxiliar';

export interface Image {
  url: string;
  file?: File;
}

const MONETARY_CURRENCY = 'R$';

const Product: React.FC = () => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState<Image>({
    url: '',
  });
  const [monetary, setMonetary] = useState<ValidatedData>({
    ...initialMonetary,
    validation: (value: string) => monetaryValidation(value, MONETARY_CURRENCY),
  });

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.target;

    setQuery(value);
  };

  return (
    <BasePage>
      <ProductsTable
        name="query"
        query={query}
        image={image}
        setImage={setImage}
        onChange={handleQueryChange}
        monetary={monetary}
        setValue={setMonetary}
      />
    </BasePage>
  );
};

export default Product;
