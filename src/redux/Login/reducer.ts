import * as swr from '../../services/swrFetch';
import { LOGIN, LOGOUT, Actions, State } from './types';

const initialState: State = {
  auth: !!localStorage.getItem('@Vendor:token'),
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('@Vendor:token', action.token);
      localStorage.setItem(
        '@MyAccount:redirect',
        `${action.redirectToMyAccount}`,
      );

      return {
        ...state,
        auth: true,
      };

    case LOGOUT:
      localStorage.clear();
      swr.clearCache();

      return {
        ...state,
        auth: false,
      };

    default:
      return state;
  }
};

export default reducer;
