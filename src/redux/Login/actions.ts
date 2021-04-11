import { LOGIN, LOGOUT, Login, Logout } from './types';

const login = (token: string): Login => ({
  type: LOGIN,
  token,
});

const logout = (): Logout => ({
  type: LOGOUT,
  token: '',
});

export { login, logout };
