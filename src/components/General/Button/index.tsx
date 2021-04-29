import React, { ButtonHTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import { colors } from '../../../styles/colors';

import {
  Container,
  ButtonChildren,
  Loader,
  StylelessContainer,
} from './styles';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  backgroundColor?: string;
  textSize?: number;
  text: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;
  color?: string;
  noBorderRadius?: boolean;
  borderRadiusPx?: string;
  borderColor?: string;
  paddingUpDown?: number;
  paddingRightLeft?: number;
  marginUpDown?: number;
  marginRightLeft?: number;
  letterSpacing?: number;
  icon?: JSX.Element;
  href?: string;
  isExternal?: boolean;
  title?: string;
  noWrap?: boolean;
  isLoading?: boolean;
  loaderSize?: number;
  areaName?: string;
  styless?: boolean;
  [props: string]: any;
}

const Button: React.FC<Button> = ({
  block = false,
  disabled = false,
  type = 'button',
  backgroundColor,
  textSize = 22,
  text,
  fontWeight = 'normal',
  color,
  noBorderRadius,
  borderRadiusPx,
  borderColor,
  paddingUpDown = 21,
  paddingRightLeft = 123,
  marginUpDown,
  marginRightLeft,
  letterSpacing = 1,
  iconOnly,
  icon,
  marginAuto,
  children,
  href,
  isExternal,
  onClick,
  title,
  noWrap,
  styless = false,
  isLoading = false,
  loaderSize = 15,
  areaName,
  ...props
}: Button) => {
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }

    if (href && !isExternal) history.push(href);
  };

  const containerProps = {
    block,
    backgroundColor,
    textSize,
    fontWeight,
    color,
    paddingUpDown,
    paddingRightLeft,
    letterSpacing,
    noBorderRadius,
    borderRadiusPx,
    borderColor,
    iconOnly,
    marginAuto,
    marginUpDown,
    marginRightLeft,
    type,
    onClick: handleClick,
    title,
    noWrap,
    ...props,
  };

  const buttonContainer = (
    <Container
      className="centered"
      disabled={isLoading || disabled}
      areaName={areaName}
      {...containerProps}
    >
      {isLoading ? (
        <Loader isLoading={isLoading}>
          <BeatLoader color={color || colors.white} size={loaderSize} />
        </Loader>
      ) : null}

      <ButtonChildren className="centered" isLoading={isLoading}>
        {icon}
        {text}
        {children || null}
      </ButtonChildren>
    </Container>
  );

  const stylessButton = (
    <StylelessContainer
      onClick={handleClick}
      disabled={isLoading || disabled}
      color={color}
    >
      {!!isLoading && (
        <Loader isLoading={isLoading}>
          <BeatLoader color={color || colors.white} size={loaderSize} />
        </Loader>
      )}
      <ButtonChildren className="centered" isLoading={isLoading}>
        {icon}
        {text}
        {children || null}
      </ButtonChildren>
    </StylelessContainer>
  );

  return <>{styless ? stylessButton : buttonContainer}</>;
};

export default Button;
