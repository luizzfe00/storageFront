import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BasePage from '../../components/General/BasePage';
import ProductsTable from '../../components/Product/ProductsTable';
import {
  ValidatedData,
  initialMonetary,
  monetaryValidation,
} from '../../interfaces/product';

type Props = RouteComponentProps<{ id: string }>;

export interface Image {
  url: string;
  file?: File;
}

const MONETARY_CURRENCY = 'R$';

const Product: React.FC<Props> = ({ match }: Props) => {
  const { id } = match.params;
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
        id={id}
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
