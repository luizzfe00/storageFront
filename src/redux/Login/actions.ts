import { LOGIN, LOGOUT, Login, Logout } from './types';

const login = (token: string, user: Record<string, unknown>): Login => ({
  type: LOGIN,
  token,
  user,
});

const logout = (): Logout => ({
  type: LOGOUT,
  token: '',
  user: undefined,
});

export { login, logout };
