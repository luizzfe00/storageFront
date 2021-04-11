import React, { useContext } from 'react';

import Input from '../General/Inputs/Input';
import Select from '../General/Inputs/Select';

import { AuthContext } from './authContext';

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from './styles';

const Register: React.FC = () => {
  const { switchToSignin } = useContext(AuthContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Nome completo" block />
        <Input type="email" placeholder="Email" block />
        <Input type="password" placeholder="Senha" block />
        <Input type="password" placeholder="Confirme sua senha" block />
        <Input type="text" placeholder="Nome do negócio" block />
        <Input type="text" placeholder="Telefone" block />
        <Input type="text" placeholder="CPF/CNPJ" block />
        <Input type="text" placeholder="Órgão expeditor" />
        <Input type="date" placeholder="Data de expedição" />
      </FormContainer>
      <SubmitButton type="submit">Confirmar</SubmitButton>
      <MutedLink href="#">
        Já possui uma conta?
        <BoldLink href="#" onClick={switchToSignin}>
          Login
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default Register;
