import React, { useState } from 'react';

import LoginForm from '../../components/Auth/Login';
import BasePage from '../../components/General/BasePage';

import {
  BoxContainer,
  TopContainer,
  BackDrop,
  backdropVariants,
  expandingTransition,
  HeaderContainer,
  HeaderText,
  SmallText,
  InnerContainer,
} from './styles';

const Auth: React.FC = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState('signin');

  return (
    <BasePage>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === 'signin' && (
            <HeaderContainer>
              <HeaderText>Bem vindo</HeaderText>
              <SmallText>Faça Login para continuar!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>{active === 'signin' && <LoginForm />}</InnerContainer>
      </BoxContainer>
    </BasePage>
  );
};

export default Auth;
