import React, { useState } from 'react';
import { icons } from '../../../assets/icons';
import Image from '../../General/Inputs/Image';
import Input from '../../General/Inputs/Input';
import MonetaryInput from '../../General/Inputs/Monetary';
import Switch from '../../General/Inputs/Switch';
import Text from '../../General/Text';
import { ProductForm as ProductFormInterface, initialState } from './auxiliar';

import { Container, ImageInputContentContainer } from './styles';

interface ProductFormProp {
  data?: any;
}

const ProductForm: React.FC<ProductFormProp> = ({ data }) => {
  const [formData, setFormData] = useState<ProductFormInterface>(
    data || initialState,
  );

  const imageInputContent = (
    <ImageInputContentContainer>
      {icons.upload}

      <small>Clique/arraste uma imagem até aqui</small>
    </ImageInputContentContainer>
  );

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const invalidity = formData.monetary.validation(value);

    setFormData((prev) => ({
      ...prev,
      monetary: {
        ...prev.monetary,
        value: value,
        invalidity: invalidity,
      },
    }));
  };

  const handleActive = (name: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (url: string, file?: File) => {
    setFormData((prev) => ({
      ...prev,
      url,
    }));
  };

  return (
    <Container>
      <Text.Label
        block
        spaceBetween
        text="Código"
        gridArea="id"
        fontWeight="bold"
      >
        <Input
          type="text"
          placeholder="Código do Produto"
          block
          value={formData.code}
        />
      </Text.Label>

      <Text.Label
        block
        spaceBetween
        text="Nome"
        gridArea="name"
        fontWeight="bold"
      >
        <Input
          type="text"
          placeholder="Nome do Produto"
          block
          value={formData.name}
        />
      </Text.Label>

      <Text.Label
        block
        spaceBetween
        text="Quantidade"
        gridArea="qtd"
        fontWeight="bold"
      >
        <Input type="number" placeholder="0" block value={formData.qtd} />
      </Text.Label>

      <Text.Label text="Valor" gridArea="value" fontWeight="bold">
        <MonetaryInput
          width="150px"
          name="value"
          value={formData.monetary.value}
          onChange={handleValue}
          validate
          validated
          validation={formData.monetary.validation}
        />
      </Text.Label>

      <Text.Label text="Ativo" gridArea="active" fontWeight="bold">
        <Switch
          name="active"
          value={formData.active}
          onChange={handleActive}
          leftText="Não"
          rightText="Sim"
          height={24}
          width={35}
          fontSize={14}
        />
      </Text.Label>

      <Text.Label
        block
        spaceBetween
        gridArea="image"
        onOnClick
        text="Selecione a imagem do produto:"
        fontWeight="bold"
      >
        <Image
          block
          short
          url={formData.image}
          content={imageInputContent}
          onFileUpload={handleImage}
          previewer={formData.previewer}
          value={formData.image}
        />
      </Text.Label>
    </Container>
  );
};

export default ProductForm;
