import {
  ValidatedData,
  initialMonetary,
} from '../../../pages/Product/auxiliar';

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
