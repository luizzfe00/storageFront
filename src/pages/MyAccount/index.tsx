import React from 'react';
import { useLocation } from 'react-router-dom';

import BasePage from '../../components/General/BasePage';

const MyAccount: React.FC = () => {
  const location = useLocation();

  console.log({ location });

  return (
    <BasePage>
      <h1>Oi</h1>
    </BasePage>
  );
};

export default MyAccount;
