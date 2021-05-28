import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AccountContext } from './contexts/AccountContext';
import { State } from './redux/Login/types';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import { useSWRHook } from './services';

const App: React.FC = () => {
  const [account, setAccount] = useState();

  const hasAuth: boolean = useSelector((state: State) => state.auth);

  const accountResponse = useSWRHook(hasAuth ? '/producer' : null).data;

  useEffect(() => {
    if (accountResponse) setAccount(accountResponse);
  }, [accountResponse]);

  return (
    <AccountContext.Provider value={{ data: account, setState: setAccount }}>
      <ToastContainer />
      <Routes />
      <Toaster
        toastOptions={{
          error: {
            style: {
              backgroundColor: 'pink',
              fontWeight: 'bold',
            },
          },
        }}
      />
    </AccountContext.Provider>
  );
};

export default App;
