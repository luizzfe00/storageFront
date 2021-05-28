import axios, {
  AxiosRequestConfig,
  AxiosResponse as ImportedAxiosResponse,
  AxiosError,
} from 'axios';

import { toast } from 'react-toastify';

import { config } from '../config';
import { logout } from '../redux';
import store from '../redux/store';

const EXPIRED_AUTH_MESSAGES = ['Sua Sessão Expirou.', 'Token Inválido'];

const api = axios.create({ baseURL: `${config.apiURL}/api/v1` });

const requestHandler = (request: AxiosRequestConfig) => {
  const savedToken = localStorage.getItem('@Vendor:token');
  if (savedToken) {
    const token = `Bearer ${savedToken}`;
    request.headers.Authorization = token;
  }

  return request;
};

api.interceptors.request.use((request) => requestHandler(request));

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (
        (error.response.status === 401 &&
          (EXPIRED_AUTH_MESSAGES.includes(error.response.data.error?.message) ||
            EXPIRED_AUTH_MESSAGES.includes(error.response.data?.message))) ||
        error.response.data.error?.message === 'invalid signature'
      ) {
        store.dispatch(logout());

        toast.error('Sua sessão expirou! Faça seu login novamente.', {
          toastId: 'jwt expired',
        });

        return Promise.reject();
      }
      return Promise.reject(error);
    }
  },
);

export const getErrorMessage = (error: AxiosError): string | undefined => {
  try {
    if (!error) return undefined;
    if (!error.response) return error.message;
    return error.response.data.error.message ?? error.response.data?.message;
  } catch (err) {
    return 'Erro desconhecido';
  }
};

export type AxiosResponse<T> = ImportedAxiosResponse<T>;

export default api;
