import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { icons } from '../../assets/icons';
import { api } from '../../services';
import Input from '../General/Inputs/Input';

import { AuthContext } from './authContext';

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from './styles';

interface RegisterForm {
  email: string;
  password: string;
  confirmPwd?: string;
}

const initialState: RegisterForm = {
  email: '',
  password: '',
  confirmPwd: '',
};

const Register: React.FC = () => {
  const history = useHistory();
  const { switchToSignin } = useContext(AuthContext);

  const [data, setData] = useState<RegisterForm>(initialState);

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const body = {
        email: data.email.trim(),
        password: data.password,
      };

      await api.post('/producer', body);
      history.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          value={data.email}
          name="email"
          type="email"
          placeholder="Email"
          block
          prepend
          onChange={handleData}
        >
          {icons.mailOutline}
        </Input>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={handleData}
          block
          prepend
        >
          {icons.password}
        </Input>
        <Input
          name="confirmPwd"
          type="password"
          placeholder="Confirme sua senha"
          value={data.confirmPwd}
          onChange={handleData}
          block
          prepend
        >
          {icons.password}
        </Input>
        <SubmitButton type="submit">Confirmar</SubmitButton>
      </FormContainer>
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
