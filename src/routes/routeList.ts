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

export const privateRouteList: RouteProps[] = [];

export const publicRouteList: RouteProps[] = [
  {
    path: '/',
    component: pages.Product,
    exact: true,
    title: 'Novo Produto',
    navbar: true,
  },
];
