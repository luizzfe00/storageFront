import React, { useState, Dispatch, SetStateAction } from 'react';

import { icons } from '../../../assets/icons';
import { ValidatedData } from '../../../interfaces/product';
import { Image } from '../../../pages/Product';
import { api, useFetch } from '../../../services';
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

  id: string;

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
  id,
  monetary,
  onChange,
  image,
  setImage,
  children,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState();

  const { data: products } = useFetch('/product');

  const data =
    products?.data?.items?.map((item: any) => ({
      code: item.code,
      name: item.name,
      value: item.value,
      quantity: item.quantity,
      active: (
        <Switch
          name="active"
          value={item.active}
          leftText="Não"
          rightText="Sim"
          height={26}
          width={40}
          fontSize={15}
        />
      ),
    })) ?? [];

  const header = [
    { name: 'Código' },
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
      onClick: async (event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        const productID = String(event?.currentTarget.value);

        const product = products.data.items.filter(
          (product: any) => product.code === productID,
        )[0];

        console.log({ product });

        setProduct(product);
        setShowModal(true);
      },
    },
    {
      title: 'Excluir',
      icon: icons.trash,
      color: colors.canceled,
      onClick: (event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        const productID = String(event?.currentTarget.value);

        const productName = products.data.items.filter(
          (product: any) => product.id === productID,
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
              await api.delete(`/product/${productID}`);
            } catch (err) {
              console.log(err);
            }
          }
        });
      },
    },
  ];

  return (
    <Container>
      <header>
        <Button
          text="ADICIONAR PRODUTO"
          backgroundColor={colors.primary}
          paddingRightLeft={60}
          paddingUpDown={10}
          icon={icons.plus}
          onClick={() => setShowModal(true)}
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
        {showModal && (
          <ProductForm
            id={id}
            product={product}
            onHide={() => setShowModal(false)}
          />
        )}
        <Table data={data} header={header} actions={actions} />
      </main>
    </Container>
  );
};

export default ProductsTable;
