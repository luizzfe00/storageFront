import UtilsFunctions from '../utils';

const MINIMUM_VALUE = 0;

export interface ValidatedData {
  value: string;
  invalidity: string;
  validation: Function;
}

export const initialMonetary: ValidatedData = {
  value: '0,00',
  invalidity: '',
  validation: (): string => '',
};

export const monetaryValidation = (value: string, currency: string): string =>
  UtilsFunctions.removeFormatting(value) < MINIMUM_VALUE
    ? `O valor da oferta deve ser maior ou igual a ${
        currency ?? 'R$'
      }${UtilsFunctions.formatCurrency(MINIMUM_VALUE, true)}`
    : '';

export interface Image {
  file?: File;
  url: string;
  uploaded: boolean;
  error: boolean;
  id: number;
  readableSize: string;
  size: number;
  name: string;
  progress: number;
}

export const initialImages: Image = {
  file: undefined,
  url: '',
  uploaded: false,
  error: false,
  id: 0,
  readableSize: '',
  size: 0,
  name: '',
  progress: 10,
};

export interface ProductForm {
  id?: number;
  code: string;
  name: string;
  quantity: number;
  images: Image[];
  active: boolean;
  value: string;
  previewer?: string;
}

export const initialState: ProductForm = {
  code: '',
  name: '',
  quantity: 0,
  active: false,
  images: [],
  value: '0.00',
  previewer: '',
};
