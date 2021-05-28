const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export interface Login {
  type: string;
  token: string;
  redirectToMyAccount: boolean;
}

export interface Logout {
  type: string;
  token: string;
  redirectToMyAccount: boolean;
}

export interface State {
  auth: boolean;
}

export type Actions = Login | Logout;

export { LOGIN, LOGOUT };
