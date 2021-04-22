import React from 'react';

import { Container } from './style';

interface BasePage {
  title?: string;
  upperComponent?: JSX.Element;
  [props: string]: any;
}

const BasePage: React.FC<BasePage> = ({
  title,
  upperComponent,
  ...props
}: BasePage) => {
  const { children } = props;
  console.log(title);

  return (
    <Container>
      <header>
        <h1>{title}</h1>
        {upperComponent}
      </header>
      {children}
    </Container>
  );
};

export default BasePage;
