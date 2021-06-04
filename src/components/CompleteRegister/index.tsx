import React, { HtmlHTMLAttributes } from 'react';
import { icons } from '../../assets/icons';
import Button from '../../components/General/Button';
import { colors } from '../../styles/colors';
import { Container, FullSizeButton, ContentContainer } from './styles';

type CompleteRegister = HtmlHTMLAttributes<HTMLDivElement>;

const CompleteRegister: React.FC<CompleteRegister> = () => {
  return (
    <Container>
      <ContentContainer>
        <div>
          {icons.errorCircle}
          <h1>Complete seu cadastro</h1>
          <Button
            text="CLIQUE AQUI"
            backgroundColor={colors.completeRegisterButton}
            color={colors.lightTextButton}
            textSize={15}
            fontWeight={700}
            letterSpacing={0.6}
            paddingRightLeft={21}
            href="/myAccount"
          />
        </div>
      </ContentContainer>
      <FullSizeButton>
        <Button
          justifyContent="center"
          text="Complete seu cadastro"
          backgroundColor={colors.completeRegisterButton}
          color={colors.lightTextButton}
          textSize={15}
          fontWeight={700}
          letterSpacing={0.6}
          paddingRightLeft={21}
          href="/myAccount"
        />
      </FullSizeButton>
    </Container>
  );
};

export default CompleteRegister;
