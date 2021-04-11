const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export interface Login {
  type: string;
  token: string;
}

export interface Logout {
  type: string;
  token: string;
}

export interface State {
  auth: boolean;
}

export type Actions = Login | Logout;

export { LOGIN, LOGOUT };
