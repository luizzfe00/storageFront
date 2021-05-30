import filesize from 'filesize';
import { Formik, Form, useFormik } from 'formik';
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

import { onSelectChangeProps } from '../../General/Inputs/definitions';
import ImageDropzone from '../../General/Inputs/Image';
import Input from '../../General/Inputs/Input';
import MonetaryInput from '../../General/Inputs/Monetary';
import Option from '../../General/Inputs/Option';
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
  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => alert(JSON.stringify(values)),
  });

  const handleActive = (name: string, value: boolean) => {
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  const handleSelect = (event: onSelectChangeProps) => {
    const { name, value } = event;
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  return (
    <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm}>
      <Form>
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
              value={formik.values.code}
              onChange={formik.handleChange}
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
              value={formik.values.name}
              onChange={formik.handleChange}
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
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
          </Text.Label>

          <Text.Label text="Valor" gridArea="value" fontWeight="bold" block>
            <MonetaryInput
              block
              name="value"
              type="number"
              value={formik.values.value}
              onChange={formik.handleChange}
            />
          </Text.Label>

          <Text.Label text="Ativo" gridArea="active" fontWeight="bold" block>
            <Switch
              name="active"
              value={formik.values.active}
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
              <Select
                name="sizeType"
                value={formik.values.sizeType}
                onChange={handleSelect}
              >
                {SIZE_TYPE.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Text.Label>

            <Text.Label text="Opções de tamanho" fontWeight="bold">
              <Select
                name="sizeOpt"
                value={formik.values.sizeOpt}
                onChange={handleSelect}
              >
                {SIZE_OPT.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Text.Label>

            <Text.Label text="Tamanho" fontWeight="bold">
              <Select
                name="sizeValue"
                value={formik.values.sizeValue}
                onChange={handleSelect}
              >
                {formik.values.sizeOpt === 0
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

            <Text.Label text="Sexo" fontWeight="bold">
              <Select
                name="sexType"
                value={formik.values.sexType}
                onChange={handleSelect}
              >
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
              text="Selecione as imagens do Produto"
              name="images"
              disabled={formik.values.images?.length >= 3}
            />
          </Text.Label>

          {/* <Button
            text="Salvar Produto"
            type="submit"
            paddingRightLeft={21}
            paddingUpDown={12}
            textSize={16}
            backgroundColor={colors.confirmButton}
            color={colors.lightTextButton}
          /> */}
        </Container>
      </Form>
    </Formik>
  );
};

export default ProductForm;
