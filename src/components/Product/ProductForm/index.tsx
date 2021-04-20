import filesize from 'filesize';
import { uniqueId } from 'lodash';
import React, { useState, useEffect } from 'react';

import { mutate, cache } from 'swr';
import { Image } from '../../../interfaces/product';
import {
  ProductForm as ProductInterface,
  initialState,
} from '../../../interfaces/product';

import { api } from '../../../services';
import { colors } from '../../../styles/colors';
import Backdrop from '../../General/Backdrop';
import Button from '../../General/Button';
import ImageDropzone from '../../General/Inputs/Image';
import FileList from '../../General/Inputs/Image/FileList';
import Input from '../../General/Inputs/Input';
import MonetaryInput from '../../General/Inputs/Monetary';
import Switch from '../../General/Inputs/Switch';
import Text from '../../General/Text';

import { Container, ImageInputContentContainer, ModalFooter } from './styles';

interface ProductFormProp {
  product?: ProductInterface;
  onHide: () => void;
  products?: any;
}

const ProductForm: React.FC<ProductFormProp> = ({
  product,
  onHide,
  products,
}) => {
  const [data, setData] = useState<ProductInterface>(product || initialState);

  useEffect(() => {
    if (data.images.length > 3) {
      setData({
        ...data,
        images: data.images.map((image, id) => {
          if (id > 2) return { ...image, error: true, uploaded: false };
          return image;
        }),
      });
    }
  }, [data.images]);

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setData((prev: any) => ({
      ...prev,
      value,
    }));
  };

  const handleActive = (name: string, value: boolean) => {
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
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
        images: {
          image1: data.images[0],
          image2: data.images[1],
          image3: data.images[2],
        },
        name: data.name,
        quantity: data.quantity,
        value: data.value,
      };

      const response = await api.post(`/product`, body);

      mutate('/product', {
        ...products,
        items: [...products.items, response.data.product],
      });
    } catch (err) {
      console.log({ ...err });
    }
  };

  const onUpload = (files: any) => {
    const uploadedFiles = files.map((file: Image) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      uploaded: true,
      error: false,
      url: URL.createObjectURL(file),
    }));

    const newImages = [...data.images, ...uploadedFiles];

    if (newImages.length > 3) return;

    setData({
      ...data,
      images: newImages,
    });
  };

  const deleteImage = (id: string) => {
    console.log(id);
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
            value={data.quantity}
            onChange={handleQuantity}
          />
        </Text.Label>

        <Text.Label text="Valor" gridArea="value" fontWeight="bold">
          <MonetaryInput
            width="150px"
            name="value"
            value={data.value}
            onChange={handleValue}
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
          OnClick
          text="Selecione a imagem do produto:"
          fontWeight="bold"
        >
          <ImageDropzone
            files={data.images}
            onUpload={onUpload}
            handleDelete={deleteImage}
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
