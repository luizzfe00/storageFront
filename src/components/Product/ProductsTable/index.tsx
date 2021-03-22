import React, { Dispatch, SetStateAction } from 'react';

import { icons } from '../../../assets/icons';
import { Image } from '../../../pages/Product';
import { ValidatedData } from '../../../pages/Product/auxiliar';
import api from '../../../services/api';
import { colors } from '../../../styles/colors';
import Button from '../../General/Button';
import Input from '../../General/Inputs/Input';
import Switch from '../../General/Inputs/Switch';
import { confirmModal } from '../../General/Modal';

import Table, { ActionInterface } from '../../General/Table';

import ProductForm from '../ProductForm';

import { Container } from './styles';

interface ProductFormProps {
  monetary: ValidatedData;
  setValue: Dispatch<SetStateAction<ValidatedData>>;

  query: string;
  name: string;
  image: Image;
  setImage: Dispatch<SetStateAction<Image>>;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  [props: string]: any;
}

const ProductsTable: React.FC<ProductFormProps> = ({
  name,
  setValue,
  query,
  monetary,
  onChange,
  image,
  setImage,
  children,
  ...props
}) => {
  const fetchedData = [
    {
      _id: 'meuId',
      code: '213213214asdsadvas123',
      name: 'Teste',
      active: true,
      qtd: 45,
      monetary: {
        value: '70,00',
        invalidity: '',
        validation: (): string => '',
      },
    },
    {
      id: 'meuId2',
      code: '1232131adsad',
      name: 'Sapato',
      active: false,
      qtd: 105,
      monetary: {
        value: '470,00',
        invalidity: '',
        validation: (): string => '',
      },
    },
  ];

  const data = [
    {
      id: '213213214asdsadvas123',
      name: 'Teste',
      value: 'R$ 70,00',
      qtd: 45,
      active: (
        <Switch
          name="active"
          value={true}
          leftText="Não"
          rightText="Sim"
          height={26}
          width={40}
          fontSize={15}
        />
      ),
    },
    {
      id: '1232131adsad',
      name: 'Sapato',
      value: 'R$ 470,00',
      qtd: 105,
      active: (
        <Switch
          name="active"
          value={false}
          leftText="Não"
          rightText="Sim"
          height={26}
          width={40}
          fontSize={15}
        />
      ),
    },
  ];

  const header = [
    { name: 'ID' },
    { name: 'Nome', isInput: true, alignCenter: true, fitContent: true },
    { name: 'Valor', alignCenter: true, fitContent: true },
    { name: 'Quantidade', alignCenter: true, fitContent: true },
    { name: 'Ativo', isInput: true, fitContent: true },
  ];

  const actions: ActionInterface[] = [
    {
      title: 'Editar',
      icon: icons.pencil,
      color: colors.primary,
      onClick: (event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        const productID = String(event?.currentTarget.value);

        const product = fetchedData.filter(
          (product) => product.code === productID,
        )[0];

        const content = {
          title: 'Adicionar Produto',
          content: <ProductForm data={product} />,
          confirmText: 'Adicionar',
        };
        confirmModal(content);
      },
    },
    {
      title: 'Excluir',
      icon: icons.trash,
      color: colors.canceled,
      onClick: (event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        const productID = String(event?.currentTarget.value);

        const productName = data.filter(
          (product) => product.id === productID,
        )[0].name;

        const content = {
          title: 'Confirmar remoção do produto',
          content: (
            <p>
              Confirmar remoção do produto <strong>{productName}</strong>,
            </p>
          ),
          confirmText: 'Confirmar',
          cancelText: 'Cancelar',
        };

        confirmModal(content).then(async (confirmation) => {
          if (confirmation) {
            try {
              // await api.delete(`/product/${productID}`);
            } catch (err) {
              console.log(err);
            }
          }
        });
      },
    },
  ];

  const handleAddClick = () => {
    const content = {
      title: 'Adicionar Produto',
      content: <ProductForm />,
      confirmText: 'Adicionar',
    };
    confirmModal(content);
  };

  return (
    <Container>
      <header>
        <Button
          text="ADICIONAR PRODUTO"
          backgroundColor={colors.primary}
          paddingRightLeft={60}
          paddingUpDown={10}
          icon={icons.plus}
          onClick={handleAddClick}
        />
        <Input
          width="30rem"
          required
          append
          value={query}
          appendedColor={colors.svgPrimary}
          onChange={onChange}
          name={name}
          {...props}
        >
          {icons.search}
        </Input>
      </header>
      <main>
        <h1>Produtos</h1>
        <Table data={data} header={header} actions={actions} />
      </main>
    </Container>
  );
};

export default ProductsTable;
