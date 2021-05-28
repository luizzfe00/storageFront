import React from 'react';

import BasePage from '../../components/General/BasePage';
import MyAccountForm from '../../components/MyAccountForm';

const MyAccount: React.FC = () => {
  return (
    <BasePage title="Dados da Conta">
      <MyAccountForm />
    </BasePage>
  );
};

export default MyAccount;
