import UtilsFunctions from '../../utils';

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
