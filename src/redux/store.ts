import { createStore } from 'redux';

import loginReducer from './Login/reducer';

const store = createStore(loginReducer);

export default store;
