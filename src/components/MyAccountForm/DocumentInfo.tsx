import { connect } from 'formik';
import React from 'react';

import Input from '../General/Inputs/FormikInput';
import Text from '../General/Text';

import { GridContainer } from './styles';

interface DocumentInfoProps {
  renderPJ: boolean;
}

const DocumentInfo: React.FC<DocumentInfoProps> = ({ renderPJ }) => {
  if (renderPJ) {
    return (
      <GridContainer>
        <Text.Label text="CNPJ" fontWeight="bold" block>
          <Input block name="document.documentNumber" />
        </Text.Label>
        <Text.Label text="Razão Social" fontWeight="bold" block>
          <Input block name="document.corporateName" />
        </Text.Label>
        <Text.Label text="Nome Fantasia" fontWeight="bold" block>
          <Input block name="document.fantasyName" />
        </Text.Label>
        <Text.Label text="Data de Abertura" fontWeight="bold" block>
          <Input block name="document.openingDate" type="date" />
        </Text.Label>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <Text.Label text="RG" fontWeight="bold" block>
        <Input block name="document.generalRegister" />
      </Text.Label>
      <Text.Label text="Órgão Expeditor" fontWeight="bold" block>
        <Input block name="document.issuer" />
      </Text.Label>
      <Text.Label text="Data de Expedição" fontWeight="bold" block>
        <Input block name="document.issueDate" type="date" />
      </Text.Label>
      <Text.Label text="CPF" fontWeight="bold" block>
        <Input block name="document.documentNumber" />
      </Text.Label>
      <Text.Label text="Banco" fontWeight="bold" block>
        <Input block name="bank.number" />
      </Text.Label>
      <Text.Label text="Agência" fontWeight="bold" block>
        <Input block name="bank.agency" />
      </Text.Label>
      <Text.Label text="Conta Corrente" fontWeight="bold" block>
        <Input block name="bank.account" />
      </Text.Label>
    </GridContainer>
  );
};

export default connect(DocumentInfo);
