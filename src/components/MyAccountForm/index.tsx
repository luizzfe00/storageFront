import { Form, Formik, FormikConfig, FormikValues, useFormik } from 'formik';
import React, { useState } from 'react';
import { object, string, date } from 'yup';

import Button from '../General/Button';
import Input from '../General/Inputs/FormikInput';
import Switch from '../General/Inputs/Switch';
import Text from '../General/Text';

import DocumentInfo from './DocumentInfo';

import {
  Container,
  FirstContent,
  Hr,
  FlexContainer,
  ButtonContainer,
  AddressContainer,
  FormHeader,
} from './styles';

const MyAccountForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      birthDate: '',
      businessName: '',
      isOnline: false,
      phoneNumber: '',
      social: {
        instagram: '',
        facebook: '',
        website: '',
      },
      bank: {
        number: undefined,
        agency: undefined,
        account: undefined,
      },
      document: {
        documentType: false,
        generalRegister: '',
        documentNumber: '',
        issuer: '',
        issueDate: '',
        corporateName: '',
        fantasyName: '',
        openingDate: '',
      },
      address: {
        street: '',
        houseNumber: undefined,
        complement: '',
        neighborhood: '',
        zipCode: '',
        city: '',
        state: '',
      },
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSwitchisOnline = (name: string, value: boolean) => {
    const { values } = formik;

    formik.setValues({ ...values, isOnline: value });
  };

  const handleSwitchDocument = (name: string, value: boolean) => {
    const { values } = formik;

    formik.setValues({
      ...values,
      document: { ...values.document, documentType: value },
    });
  };

  const personalValidation = object().shape({
    name: string()
      .min(2, 'Nome inválido!')
      .required('É preciso informar um nome.'),
    businessName: string()
      .min(2, 'Nome inválido!')
      .required('É preciso informar o nome da loja.'),
    email: string()
      .email('E-mail inválido!')
      .required('É preciso informar um e-mail.'),
    birthDate: date().required('É preciso informar uma data de nascimento.'),
    phoneNumber: string()
      .length(11, 'Informe um número válido')
      .required('É preciso informar um número de telefone.'),
  });

  const documentAndBankValidation = object().shape({
    document: object({
      generalRegister: string().when('documentType', {
        is: false,
        then: string().required('É preciso informar o RG.'),
      }),
      documentNumber: string().required('É preciso informar o CPF.'),
      issuer: string().when('documentType', {
        is: false,
        then: string().required('É preciso informar o Órgão Expeditor.'),
      }),
      issueDate: string().when('documentType', {
        is: false,
        then: string().required('É preciso informar a Data de Expedição.'),
      }),
      corporateName: string().when('documentType', {
        is: true,
        then: string().required('É preciso informar a Razão Social.'),
      }),
      fantasyName: string().when('documentType', {
        is: true,
        then: string().required('É preciso informar o Nome Fantasia.'),
      }),
      openingDate: string().when('documentType', {
        is: true,
        then: string().required('É preciso informar a Data de Abertura.'),
      }),
    }),
  });

  return (
    <Container>
      <FormStepper
        initialValues={formik.initialValues}
        onSubmit={async (values: any) => {
          console.log('values', values);
        }}
      >
        <FormStep label="Dados Pessoais" validationSchema={personalValidation}>
          <FirstContent>
            <Text.Label text="Nome" fontWeight="bold" block>
              <Input name="name" block />
            </Text.Label>
            <Text.Label text="Nome da Loja" fontWeight="bold" block>
              <Input name="businessName" block />
            </Text.Label>

            <Text.Label text="E-mail" fontWeight="bold" block>
              <Input name="email" block />
            </Text.Label>

            <FlexContainer>
              <Text.Label text="Data de Nascimento" fontWeight="bold" block>
                <Input
                  block
                  name="birthDate"
                  placeholder={new Date().toLocaleDateString()}
                  type="date"
                />
              </Text.Label>

              <Text.Label text="Telefone" fontWeight="bold" block>
                <Input
                  block
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  placeholder="(00) 00000-0000"
                />
              </Text.Label>

              <Text.Label text="Loja Virtual" fontWeight="bold" block>
                <Switch
                  name="isOnline"
                  onChange={(name, value) => console.log(name, value)}
                  leftText="Não"
                  rightText="Sim"
                  height={32}
                  width={40}
                  fontSize={14}
                />
              </Text.Label>
            </FlexContainer>
          </FirstContent>

          <Hr />

          <FlexContainer>
            <Text.Label text="Instagram" fontWeight="bold" block>
              <Input
                block
                name="social.instagram"
                onChange={formik.handleChange}
              />
            </Text.Label>

            <Text.Label text="Facebook" fontWeight="bold" block>
              <Input
                block
                name="social.facebook"
                onChange={formik.handleChange}
              />
            </Text.Label>

            <Text.Label text="Website" fontWeight="bold" block>
              <Input
                block
                name="social.website"
                onChange={formik.handleChange}
              />
            </Text.Label>
          </FlexContainer>

          <Hr />
        </FormStep>

        <FormStep
          label="Documentos e Dados Bancários"
          validationSchema={documentAndBankValidation}
        >
          <FlexContainer>
            <Text.Label
              text="Tipo de Conta"
              textAlign="center"
              block
              fontWeight="bold"
              alignChildren="center"
            >
              <Switch
                leftText="PF"
                rightText="PJ"
                name="document.documentType"
                value={formik.values.document.documentType}
                onChange={(name, value) => formik.setFieldValue(name, value)}
                height={32}
                width={48}
                fontSize={14}
              />
            </Text.Label>
          </FlexContainer>

          <DocumentInfo renderPJ={formik.values.document.documentType} />

          <Hr />
        </FormStep>

        <FormStep label="Endereço">
          <AddressContainer>
            <Text.Label
              text="Endereço"
              fontWeight="bold"
              gridArea="street"
              block
            >
              <Input block name="address.street" />
            </Text.Label>
            <Text.Label text="Número" fontWeight="bold" gridArea="num" block>
              <Input block name="address.number" />
            </Text.Label>
            <Text.Label text="Bairro" fontWeight="bold" gridArea="neigh" block>
              <Input block name="address.neighborhood" />
            </Text.Label>
            <Text.Label
              text="Complemento"
              fontWeight="bold"
              gridArea="comp"
              block
            >
              <Input block name="address.complement" />
            </Text.Label>

            <Text.Label text="CEP" fontWeight="bold" gridArea="zip" block>
              <Input block name="address.zipCode" />
            </Text.Label>
            <Text.Label text="Cidade" fontWeight="bold" gridArea="city" block>
              <Input block name="address.city" />
            </Text.Label>
            <Text.Label text="Estado" fontWeight="bold" gridArea="state" block>
              <Input block name="address.state" />
            </Text.Label>
          </AddressContainer>
          <Hr />
        </FormStep>
      </FormStepper>
    </Container>
  );
};

export interface FormStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export const FormStep = ({ children }: FormStepProps) => {
  return <>{children}</>;
};

export const FormStepper = ({
  children,
  ...props
}: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement<FormStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form autoComplete="off">
            <FormHeader>{currentChild.props.label}</FormHeader>
            {currentChild}
            <ButtonContainer>
              {step > 0 ? (
                <Button
                  disabled={isSubmitting}
                  text="Voltar"
                  onClick={() => setStep((prev) => prev - 1)}
                  paddingRightLeft={24}
                  paddingUpDown={8}
                  fontWeight="bold"
                  textSize={30}
                />
              ) : null}
              <Button
                disabled={isSubmitting}
                text={isLastStep() ? 'Concluir' : 'Avançar'}
                type="submit"
                paddingRightLeft={24}
                paddingUpDown={8}
                fontWeight="bold"
                textSize={30}
              ></Button>
            </ButtonContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MyAccountForm;
