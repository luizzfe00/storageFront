import { LOGIN, LOGOUT, Login, Logout } from './types';

const login = (token: string, redirectToMyAccount: boolean): Login => ({
  type: LOGIN,
  redirectToMyAccount,
  token,
});

const logout = (): Logout => ({
  type: LOGOUT,
  token: '',
  redirectToMyAccount: false,
});

export { login, logout };
