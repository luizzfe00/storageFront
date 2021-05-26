import { RouteProps as ReactDOMRouterProps } from 'react-router-dom';
import { icons } from '../assets/icons';
import * as pages from '../pages';

export interface RouteProps extends ReactDOMRouterProps {
  component: React.ComponentType<any>;
  isInaccessible?: boolean;
  isSubRoute?: boolean;
  title: string;
  navbar: boolean;
  icon?: JSX.Element;
  path?: string;
  group?: string;
  auth?: boolean;
  type?: string;
  key?: string;
  id?: boolean;
}

export const privateRouteList: RouteProps[] = [
  {
    path: '/myAccount',
    component: pages.MyAccount,
    exact: true,
    icon: icons.user,
    title: 'Minha Conta',
    navbar: true,
  },
  {
    path: '/products',
    component: pages.Products,
    exact: true,
    icon: icons.listMenu,
    title: 'Produtos',
    navbar: true,
  },
  {
    path: '/product/:id?',
    component: pages.Product,
    exact: true,
    icon: icons.plus,
    title: 'Criar Produto',
    navbar: true,
    id: true,
  },
  {
    path: '/orders',
    component: pages.Orders,
    exact: true,
    icon: icons.clipboard,
    title: 'Pedidos',
    navbar: true,
  },
];

export const publicRouteList: RouteProps[] = [
  {
    path: '/login',
    component: pages.Auth,
    exact: true,
    title: 'Início',
    navbar: false,
  },
  {
    path: '/',
    component: pages.Auth,
    exact: true,
    title: 'Início',
    navbar: false,
  },
  {
    path: '/register',
    component: pages.Auth,
    exact: true,
    title: 'Início',
    navbar: false,
  },
];
