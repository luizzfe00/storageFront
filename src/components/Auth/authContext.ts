import { createContext } from 'react';

export const AuthPages = {
  switchToSignup: () => {
    return undefined;
  },
  switchToSignin: () => {
    return undefined;
  },
};

interface AuthInterface {
  switchToSignup: () => void;
  switchToSignin: () => void;
}

export const AuthContext = createContext<AuthInterface>(AuthPages);
