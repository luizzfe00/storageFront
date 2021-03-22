const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export interface Login {
  type: string;
  token: string;
  user: Record<string, unknown> | undefined;
}

export interface Logout {
  type: string;
  token: string;
  user: Record<string, unknown> | undefined;
}

export interface State {
  auth: boolean;
}

export type Actions = Login | Logout;

export { LOGIN, LOGOUT };
