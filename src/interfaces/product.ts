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

export interface ProductForm {
  code: string;
  name: string;
  qtd: number;
  image: string;
  active: boolean;
  monetary: ValidatedData;
  previewer?: string;
}

export const initialState: ProductForm = {
  code: '',
  name: '',
  qtd: 0,
  active: false,
  image: '',
  monetary: initialMonetary,
  previewer: '',
};

export interface ImageInterface {
  url: string;
  file?: File;
}

export const initialImage: ImageInterface = {
  url: '',
  file: undefined,
};
