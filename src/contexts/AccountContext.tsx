import { createContext } from 'react';
import { IAccountRegister } from '../interfaces/Account';

interface Register {
  data?: IAccountRegister | any;
  setState: (prev?: any) => void | undefined;
}

const initialValue: Register = {
  data: undefined,
  setState: () => {
    return undefined;
  },
};

export const AccountContext = createContext<Register>(initialValue);
