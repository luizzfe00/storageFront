import React, { useState } from 'react';
import { icons } from '../../../assets/icons';
import { ImageInterface, initialImage } from '../../../interfaces/product';
import {
  ProductForm as ProductInterface,
  initialState,
} from '../../../interfaces/product';
import { api } from '../../../services';
import { colors } from '../../../styles/colors';
import Backdrop from '../../General/Backdrop';
import Button from '../../General/Button';
import Image from '../../General/Inputs/Image';
import Input from '../../General/Inputs/Input';
import MonetaryInput from '../../General/Inputs/Monetary';
import Switch from '../../General/Inputs/Switch';
import Text from '../../General/Text';

import { Container, ImageInputContentContainer, ModalFooter } from './styles';

interface ProductFormProp {
  product?: ProductInterface;
  onHide: () => void;
  id: string;
}

const ProductForm: React.FC<ProductFormProp> = ({ product, onHide, id }) => {
  const [data, setData] = useState<ProductInterface>(product || initialState);
  const [image, setImage] = useState<ImageInterface>(initialImage);

  const imageInputContent = (
    <ImageInputContentContainer>
      {icons.upload}

      <small>Clique/arraste uma imagem até aqui</small>
    </ImageInputContentContainer>
  );

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const invalidity = data.monetary.validation(value);

    setData((prev: any) => ({
      ...prev,
      monetary: {
        ...prev.monetary,
        value: value,
        invalidity: invalidity,
      },
    }));
  };

  const handleActive = (name: string, value: boolean) => {
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (url: string, file?: File) => {
    setData((prev: any) => ({
      ...prev,
      url,
    }));

    setImage({ url, file });
  };

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (Number(value) < 0) return;

    setData((prev: any) => ({
      ...prev,
      qtd: Number(value),
    }));
  };

  const handleAddProduct = async () => {
    try {
      const body = {
        code: data.code,
        active: data.active,
        image: image.url,
        name: data.name,
        quantity: data.qtd,
        value: data.monetary.value,
      };

      await api.post(`/product/1`, body);
    } catch (err) {
      console.log({ ...err });
    }
  };

  return (
    <>
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
            name="code"
            placeholder="Código do Produto"
            block
            value={data.code}
            onChange={handleText}
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
            name="name"
            placeholder="Nome do Produto"
            block
            value={data.name}
            onChange={handleText}
          />
        </Text.Label>

        <Text.Label
          block
          spaceBetween
          text="Quantidade"
          gridArea="qtd"
          fontWeight="bold"
        >
          <Input
            type="number"
            name="qtd"
            placeholder="0"
            min={0}
            block
            value={data.qtd}
            onChange={handleQuantity}
          />
        </Text.Label>

        <Text.Label text="Valor" gridArea="value" fontWeight="bold">
          <MonetaryInput
            width="150px"
            name="value"
            value={data.monetary.value}
            onChange={handleValue}
            validate
            validated
            validation={data.monetary.validation}
          />
        </Text.Label>

        <Text.Label text="Ativo" gridArea="active" fontWeight="bold">
          <Switch
            name="active"
            value={data.active}
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
            url={image.url}
            content={imageInputContent}
            onFileUpload={handleImage}
            previewer={data.previewer}
            value={data.image}
          />
        </Text.Label>

        <ModalFooter>
          <Button
            text="Cancelar"
            onClick={onHide}
            className="cancelButton"
            paddingRightLeft={21}
            paddingUpDown={12}
            textSize={16}
            backgroundColor={colors.lightButton}
            color={colors.darkTextButton}
          />
          <Button
            text="Salvar Produto"
            onClick={handleAddProduct}
            paddingRightLeft={21}
            paddingUpDown={12}
            textSize={16}
            backgroundColor={colors.confirmButton}
            color={colors.lightTextButton}
          />
        </ModalFooter>
      </Container>
      <Backdrop />
    </>
  );
};

export default ProductForm;
