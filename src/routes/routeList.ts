import { RouteProps as ReactDOMRouterProps } from 'react-router-dom';
import { icons } from '../assets/icons';
import * as pages from '../pages';

export interface RouteProps extends ReactDOMRouterProps {
  component: React.ComponentType<any>;
  isInaccessible?: boolean;
  isSubRoute?: boolean;
  title: string;
  navbar: boolean;
  path?: string;
  group?: string;
  auth?: boolean;
  type?: string;
  key?: string;
  id?: boolean;
}

export const privateRouteList: RouteProps[] = [
  {
    path: '/products',
    component: pages.Product,
    exact: true,
    title: 'Produtos',
    navbar: true,
  },
  {
    path: '/sell',
    component: pages.Sell,
    exact: true,
    title: 'Venda',
    navbar: true,
  },
];

export const publicRouteList: RouteProps[] = [
  {
    path: '/auth',
    component: pages.Auth,
    exact: true,
    title: 'Início',
    navbar: false,
  },
];
