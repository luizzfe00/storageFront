import filesize from 'filesize';
import { uniqueId } from 'lodash';
import React, { useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';
import { icons } from '../../../assets/icons';
import { Image } from '../../../interfaces/product';
import { Product, initialState } from '../../../interfaces/product';

import api, { getErrorMessage } from '../../../services/api';
import { colors } from '../../../styles/colors';
import { removeFormatting } from '../../../utils/formatCurrency';
import Button from '../../General/Button';
import Checkbox from '../../General/Inputs/Checkbox';

import { onSelectChangeProps } from '../../General/Inputs/definitions';
import ImageDropzone from '../../General/Inputs/Image';
import FileList from '../../General/Inputs/Image/FileList';
import Input from '../../General/Inputs/Input';
import MonetaryInput from '../../General/Inputs/Monetary';
import Option from '../../General/Inputs/Option';
import Radio from '../../General/Inputs/Radio';
import Select from '../../General/Inputs/Select';
import Switch from '../../General/Inputs/Switch';
import Text from '../../General/Text';

import { Container, SizeContainer, SizeOptions } from './styles';

interface ProductFormProp {
  product?: Product;
}

const PRODUCT_GENDER = [
  { id: 0, label: 'Unissex' },
  { id: 1, label: 'Masculino' },
  { id: 2, label: 'Feminino' },
];

const SIZE_TYPE = [
  { id: 0, label: 'Único' },
  { id: 1, label: 'Criança' },
  { id: 2, label: 'Adulto' },
  { id: 3, label: 'Plus Size' },
];

const SIZE_OPT = [
  { id: 0, label: 'Alfabético' },
  { id: 1, label: 'Numérico' },
];

const SIZES_ALFA = [
  { id: 0, label: 'PP', value: false },
  { id: 1, label: 'P', value: true },
  { id: 2, label: 'M', value: false },
  { id: 3, label: 'G', value: false },
  { id: 4, label: 'GG', value: false },
];

const SIZES_NUM_ADULT = [
  { id: 0, label: '33', value: true },
  { id: 1, label: '34', value: false },
  { id: 2, label: '35', value: false },
  { id: 3, label: '36', value: false },
  { id: 4, label: '37', value: false },
  { id: 5, label: '38', value: false },
  { id: 6, label: '39', value: false },
  { id: 7, label: '40', value: false },
  { id: 8, label: '41', value: false },
  { id: 9, label: '42', value: false },
];

const ProductForm: React.FC<ProductFormProp> = ({ product }) => {
  const [data, setData] = useState<Product>(product || initialState);

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
      value: value,
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
      quantity: Number(value),
    }));
  };

  const handleSubmit = async () => {
    try {
      const body = {
        code: data.code,
        active: data.active,
        images: {
          image1: data.images[0]?.url,
          image2: data.images[1]?.url,
          image3: data.images[2]?.url,
        },
        name: data.name,
        quantity: data.quantity,
        value: data.value,
      };

      if (product) {
        await api.put(`/product/${data.id}`, body);
        toast.success('Produto atualizado com sucesso');
      } else {
        await api.post(`/product`, body);
        toast.success('Produto criado com sucesso');
      }
    } catch (err) {
      toast.error('Erro ao criar produto');
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

  const handleSizeOpt = (event: onSelectChangeProps) => {
    const { value } = event;
    setData((prev) => ({
      ...prev,
      sizeOpt: Number(value),
    }));
  };

  return (
    <>
      <Container>
        <Text.Label
          block
          spaceBetween
          text="Código"
          gridArea="code"
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
            name="quantity"
            placeholder="0"
            min={0}
            block
            value={data.quantity}
            onChange={handleQuantity}
          />
        </Text.Label>

        <Text.Label text="Valor" gridArea="value" fontWeight="bold" block>
          <MonetaryInput
            block
            name="value"
            type="number"
            value={data.value}
            onChange={handleValue}
          />
        </Text.Label>

        <Text.Label text="Ativo" gridArea="active" fontWeight="bold" block>
          <Switch
            name="active"
            value={data.active}
            onChange={handleActive}
            leftText="Não"
            rightText="Sim"
            height={28}
            width={40}
            fontSize={14}
          />
        </Text.Label>

        <SizeContainer>
          <Text.Label text="Tamanho da peça" fontWeight="bold">
            <Select value={data.sizeType}>
              {SIZE_TYPE.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Text.Label>

          <Text.Label text="Opções de tamanho" fontWeight="bold">
            <Select value={data.sizeOpt} onChange={handleSizeOpt}>
              {SIZE_OPT.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Text.Label>

          <Text.Label text="Tamanho" fontWeight="bold">
            <Select value={data.sizeValue}>
              {data.sizeOpt === 0
                ? SIZES_ALFA.map((option) => (
                    <Option key={option.id} value={option.label}>
                      {option.label}
                    </Option>
                  ))
                : SIZES_NUM_ADULT.map((option) => (
                    <Option key={option.id} value={option.label}>
                      {option.label}
                    </Option>
                  ))}
            </Select>
          </Text.Label>

          <Text.Label text="Gênero" fontWeight="bold">
            <Select>
              {PRODUCT_GENDER.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Text.Label>
        </SizeContainer>

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
            disabled={data.images.length >= 3}
          />
        </Text.Label>

        {/*<Button
          text="Salvar Produto"
          onClick={handleSubmit}
          paddingRightLeft={21}
          paddingUpDown={12}
          textSize={16}
          backgroundColor={colors.confirmButton}
          color={colors.lightTextButton}
        /> */}
      </Container>
    </>
  );
};

export default ProductForm;
