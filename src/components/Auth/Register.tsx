import React, { useContext, useState } from 'react';

import { icons } from '../../assets/icons';
import Input from '../General/Inputs/Input';

import { AuthContext } from './authContext';

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
  DocumentContainer,
} from './styles';

interface RegisterForm {
  name: string;
  businessName: string;
  email: string;
  password: string;
  confirmPwd?: string;
  phoneNumber: string;
  documentNumber: string;
  issuer: string;
  issueDate: Date;
}

const initialState: RegisterForm = {
  businessName: '',
  documentNumber: '',
  email: '',
  issueDate: new Date(),
  issuer: '',
  name: '',
  password: '',
  phoneNumber: '',
  confirmPwd: '',
};

const Register: React.FC = () => {
  const { switchToSignin } = useContext(AuthContext);

  const [data, setData] = useState<RegisterForm>(initialState);

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          name="name"
          type="text"
          placeholder="Nome completo"
          value={data.name}
          onChange={handleData}
          block
          prepend
        >
          {icons.user}
        </Input>
        <Input
          name="businessName"
          type="text"
          placeholder="Nome do negócio"
          value={data.businessName}
          onChange={handleData}
          block
          prepend
        >
          {icons.business}
        </Input>
        <Input name="email" type="email" placeholder="Email" block prepend>
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
        <Input
          name="phoneNumber"
          type="text"
          placeholder="Telefone"
          value={data.phoneNumber}
          onChange={handleData}
          block
          prepend
        >
          {icons.phone}
        </Input>
        <Input
          name="documentNumber"
          type="text"
          placeholder="CPF/CNPJ"
          value={data.documentNumber}
          onChange={handleData}
          block
          prepend
        >
          {icons.personalDoc}
        </Input>
        <DocumentContainer>
          <Input
            name="issuer"
            type="text"
            placeholder="Órgão expeditor"
            value={data.issuer}
            onChange={handleData}
            prepend
            block
          >
            {icons.government}
          </Input>
          <Input
            name="issueDate"
            type="date"
            placeholder="Data de expedição"
            value={data.issueDate.toString()}
            onChange={handleData}
            prepend
            block
          >
            {icons.calendar}
          </Input>
        </DocumentContainer>
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
