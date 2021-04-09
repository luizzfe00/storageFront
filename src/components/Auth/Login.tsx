import React from 'react';

import Input from '../General/Inputs/Input';

import {
  BoxContainer,
  FormContainer,
  BoldLink,
  MutedLink,
  SubmitButton,
} from './styles';

const Login: React.FC = () => {
  return (
    <BoxContainer>
      <FormContainer>
        <Input block type="email" placeholder="Email" />
        <Input block type="password" placeholder="Senha" />
      </FormContainer>
      <MutedLink href="#">Esqueceu sua senha?</MutedLink>
      <SubmitButton type="submit">Login</SubmitButton>
      <MutedLink href="#">
        Não tem uma conta? <BoldLink href="#">Registre-se</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default Login;
