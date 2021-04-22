import React, { useState, useEffect } from 'react';

import { icons } from '../../../assets/icons';
import { ProductForm as ProductFormInterface } from '../../../interfaces/product';
import { api, useFetch } from '../../../services';
import { colors } from '../../../styles/colors';
import Button from '../../General/Button';
import Input from '../../General/Inputs/Input';
import { confirmModal } from '../../General/Modal';

import Table, { ActionInterface } from '../../General/Table';

import ProductForm from '../ProductForm';

import { Container } from './styles';

const ProductsTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [product, setProduct] = useState();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({
    name: '',
    code: '',
  });

  const { data: products } = useFetch('/product', query);

  useEffect(() => {
    if (search.length > 3) {
      setQuery({
        name: search,
        code: search,
      });
    } else {
      setQuery({
        name: '',
        code: '',
      });
    }
  }, [search]);

  const data =
    products?.data?.items?.map((item: any) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      value: item.value,
      quantity: item.quantity,
      active: item.active ? icons.checkCircle : icons.checkCircleOff,
    })) ?? [];

  const header = [
    { name: 'ID', fitContent: true },
    { name: 'Código', fitContent: true, alignCenter: true },
    { name: 'Nome', isInput: true, alignCenter: true, fitContent: true },
    { name: 'Valor', alignCenter: true, fitContent: true },
    { name: 'Quantidade', alignCenter: true, fitContent: true },
    { name: 'Ativo', isIcon: true, fitContent: true },
  ];

  const actions: ActionInterface[] = [
    {
      title: 'Editar',
      icon: icons.pencil,
      color: colors.primary,
      onClick: async (event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        console.log(event?.currentTarget.value);

        const productID = Number(event?.currentTarget.value);

        const product = products.data.items.filter(
          (product: ProductFormInterface) => product.id === productID,
        )[0];

        const { image1, image2, image3 } = product.images;

        setProduct({
          ...product,
          images: [image1, image2, image3],
        });
        setShowModal(true);
      },
    },
    {
      title: 'Excluir',
      icon: icons.trash,
      color: colors.canceled,
      onClick: (event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        console.log(event?.currentTarget.value);

        const productID = Number(event?.currentTarget.value);

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

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <Container>
      <header>
        {showSearch && (
          <Input
            width="20rem"
            required
            prepend
            value={search}
            onChange={handleQuery}
          >
            {icons.search}
          </Input>
        )}
        {!showSearch && (
          <Button
            text="Buscar"
            styless
            color={colors.link}
            icon={icons.search}
            onClick={() => setShowSearch(true)}
          />
        )}
        <Button
          text="Add Produto"
          styless
          color={colors.link}
          icon={icons.plus}
          onClick={() => setShowModal(true)}
        />
      </header>
      <main>
        {showModal && (
          <ProductForm
            products={products}
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
