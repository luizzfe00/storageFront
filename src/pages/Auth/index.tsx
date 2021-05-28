import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../components/Auth/authContext';
import LoginForm from '../../components/Auth/Login';
import RegisterForm from '../../components/Auth/Register';
import BasePage from '../../components/General/BasePage';

import {
  BoxContainer,
  TopContainer,
  BackDrop,
  backdropVariants,
  HeaderContainer,
  HeaderText,
  SmallText,
  InnerContainer,
} from './styles';

export const expandingTransition = {
  type: 'spring',
  duration: 100,
  stiffness: 30,
};

const Auth: React.FC = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState('signin');

  const history = useHistory();

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signup');
      history.push('/register');
    }, 200);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signin');
      history.push('/login');
    }, 200);
  };

  const contextValue = { switchToSignin, switchToSignup };

  return (
    <AuthContext.Provider value={contextValue}>
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
            {active === 'signup' && (
              <HeaderContainer>
                <HeaderText>Registre-se</HeaderText>
                <SmallText>Informe seus dados para continuar!</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === 'signin' && <LoginForm />}
            {active === 'signup' && <RegisterForm />}
          </InnerContainer>
        </BoxContainer>
      </BasePage>
    </AuthContext.Provider>
  );
};

export default Auth;
