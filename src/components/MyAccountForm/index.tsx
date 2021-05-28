import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  useFormik,
} from 'formik';
import React, { useState } from 'react';
import { mixed, number, object } from 'yup';

import Button from '../General/Button';
import Input from '../General/Inputs/Input';
import Switch from '../General/Inputs/Switch';
import Text from '../General/Text';

import {
  Container,
  FirstContent,
  Hr,
  FlexContainer,
  ButtonContainer,
  AddressContainer,
  GridContainer,
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
      document: {
        documentType: false,
        generalRegister: '',
        documentNumber: '',
        issuer: '',
        issueDate: '',
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

  const renderPFContent = (
    <>
      <Text.Label text="RG" fontWeight="bold">
        <Input
          name="document.generalRegister"
          value={formik.values.document.generalRegister}
          onChange={formik.handleChange}
        />
      </Text.Label>
      <Text.Label text="CPF" fontWeight="bold">
        <Input
          name="document.documentNumber"
          value={formik.values.document.documentNumber}
          onChange={formik.handleChange}
        />
      </Text.Label>
    </>
  );

  return (
    <Container>
      <FormStepper
        initialValues={{
          firstName: '',
          lastName: '',
          millionaire: false,
          money: 0,
          description: '',
        }}
        onSubmit={async (values: any) => {
          console.log('values', values);
        }}
      >
        <FormStep label="Personal Data">
          <FirstContent>
            <Text.Label text="Nome" fontWeight="bold" block>
              <Input
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                block
              />
            </Text.Label>

            <Text.Label text="Nome da Loja" fontWeight="bold" block>
              <Input
                name="businessName"
                onChange={formik.handleChange}
                value={formik.values.businessName}
                block
              />
            </Text.Label>

            <Text.Label text="E-mail" fontWeight="bold" block>
              <Input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                block
              />
            </Text.Label>

            <FlexContainer>
              <Text.Label text="Data de Nascimento" fontWeight="bold">
                <Input
                  name="birthDate"
                  onChange={formik.handleChange}
                  value={formik.values.birthDate}
                  placeholder={new Date().toLocaleDateString()}
                />
              </Text.Label>

              <Text.Label text="Telefone" fontWeight="bold">
                <Input
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  placeholder="(00) 0 0000-0000"
                />
              </Text.Label>

              <Text.Label text="Loja Virtual" fontWeight="bold">
                <Switch
                  name="isOnline"
                  value={formik.values.isOnline}
                  onChange={handleSwitchisOnline}
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
                value={formik.values.social.instagram}
              />
            </Text.Label>

            <Text.Label text="Facebook" fontWeight="bold" block>
              <Input
                block
                name="social.facebook"
                onChange={formik.handleChange}
                value={formik.values.social.facebook}
              />
            </Text.Label>

            <Text.Label text="Website" fontWeight="bold" block>
              <Input
                block
                name="social.website"
                onChange={formik.handleChange}
                value={formik.values.social.website}
              />
            </Text.Label>
          </FlexContainer>

          <Hr />
        </FormStep>

        <FormStep label="Document Info">
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
                onChange={handleSwitchDocument}
                height={32}
                width={48}
                fontSize={14}
              />
            </Text.Label>
          </FlexContainer>

          {!formik.values.document.documentType ? (
            <GridContainer>
              <Text.Label text="RG" fontWeight="bold" block>
                <Input
                  block
                  name="document.generalRegister"
                  value={formik.values.document.generalRegister}
                  onChange={formik.handleChange}
                />
              </Text.Label>
              <Text.Label text="Órgão Expeditor" fontWeight="bold" block>
                <Input
                  block
                  name="document.issuer"
                  value={formik.values.document.issuer}
                  onChange={formik.handleChange}
                />
              </Text.Label>
              <Text.Label text="Data de Expedição" fontWeight="bold" block>
                <Input
                  block
                  name="document.issueDate"
                  value={formik.values.document.issueDate}
                  onChange={formik.handleChange}
                />
              </Text.Label>
              <Text.Label text="CPF" fontWeight="bold" block>
                <Input
                  block
                  name="document.documentNumber"
                  value={formik.values.document.documentNumber}
                  onChange={formik.handleChange}
                />
              </Text.Label>
            </GridContainer>
          ) : (
            <GridContainer>
              <Text.Label text="CNPJ" fontWeight="bold" block>
                <Input
                  block
                  name="document.documentNumber"
                  value={formik.values.document.documentNumber}
                  onChange={formik.handleChange}
                />
              </Text.Label>
            </GridContainer>
          )}
          <Hr />
        </FormStep>

        <FormStep label="Address Info">
          <AddressContainer>
            <Text.Label
              text="Endereço"
              fontWeight="bold"
              gridArea="street"
              block
            >
              <Input
                block
                name="address.street"
                onChange={formik.handleChange}
                value={formik.values.address.street}
              />
            </Text.Label>
            <Text.Label
              text="Complemento"
              fontWeight="bold"
              gridArea="comp"
              block
            >
              <Input
                block
                name="address.complement"
                onChange={formik.handleChange}
                value={formik.values.address.complement}
              />
            </Text.Label>
            <Text.Label text="Número" fontWeight="bold" gridArea="num" block>
              <Input
                block
                name="address.number"
                onChange={formik.handleChange}
                value={formik.values.address.houseNumber}
              />
            </Text.Label>
            <Text.Label text="Bairro" fontWeight="bold" gridArea="neigh" block>
              <Input
                block
                name="address.neighborhood"
                onChange={formik.handleChange}
                value={formik.values.address.neighborhood}
              />
            </Text.Label>
            <Text.Label text="CEP" fontWeight="bold" gridArea="zip" block>
              <Input
                block
                name="address.zipCode"
                onChange={formik.handleChange}
                value={formik.values.address.zipCode}
              />
            </Text.Label>
            <Text.Label text="Cidade" fontWeight="bold" gridArea="city" block>
              <Input
                block
                name="address.city"
                onChange={formik.handleChange}
                value={formik.values.address.city}
              />
            </Text.Label>
            <Text.Label text="Estado" fontWeight="bold" gridArea="state" block>
              <Input
                block
                name="address.state"
                onChange={formik.handleChange}
                value={formik.values.address.state}
              />
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

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
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
      )}
    </Formik>
  );
};

export default MyAccountForm;
