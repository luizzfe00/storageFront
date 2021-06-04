import React from 'react';

import { formatCurrency } from '../../../utils/formatCurrency';

import { Container, InfoContainer, ValueContainer, Value } from './styles';

interface ProductDetailsProps {
  data?: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ data }) => {
  if (data)
    return (
      <Container>
        <img src={data.images[0]} alt="IMAGEM DO PRODUTO" />
        <InfoContainer>
          <ValueContainer>
            Código: <Value>{data.code}</Value>
          </ValueContainer>
          <ValueContainer>
            Nome: <Value>{data.name}</Value>
          </ValueContainer>
          <ValueContainer>
            Valor: <Value>{formatCurrency(data.value)}</Value>
          </ValueContainer>
          <ValueContainer>
            Quantidade em Estoque: <Value>{data.quantity}</Value>
          </ValueContainer>
          <ValueContainer>
            Ativo: <Value>{String(data.active)}</Value>
          </ValueContainer>
        </InfoContainer>
      </Container>
    );
  return <div>BUSCANDO PRODUTO</div>;
};

export default ProductDetails;
