import React, { useState, FormEvent, useContext } from 'react';

import { useDispatch } from 'react-redux';

import { login } from '../../redux/Login/actions';
import { api } from '../../services/index';
import Input from '../General/Inputs/Input';
import { AuthContext } from './authContext';

import {
  BoxContainer,
  FormContainer,
  BoldLink,
  MutedLink,
  SubmitButton,
} from './styles';

interface LoginResponse {
  data: {
    token: string;
    myAccount: boolean;
  };
}

const initialData = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const { switchToSignup } = useContext(AuthContext);

  const [data, setData] = useState(initialData);

  const handleField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const response: LoginResponse = await api.post('/auth/signin', data);

    const { token, myAccount } = response.data;

    dispatch(login(token, myAccount));
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleLogin}>
        <Input
          block
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleField}
          value={data.email}
        />
        <Input
          block
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleField}
          value={data.password}
        />
        <MutedLink href="#">Esqueceu sua senha?</MutedLink>
        <SubmitButton type="submit">Login</SubmitButton>
        <MutedLink href="#">
          Não tem uma conta?{' '}
          <BoldLink href="#" onClick={switchToSignup}>
            Registre-se
          </BoldLink>
        </MutedLink>
      </FormContainer>
    </BoxContainer>
  );
};

export default Login;
