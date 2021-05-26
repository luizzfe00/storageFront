import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { AccountContext } from './contexts/AccountContext';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default App;
