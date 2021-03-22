import React from 'react';

import { StyledAnchor, StyledLink } from './styles';

interface linkPath {
  pathname: string;
  state?:
    | {
        [prop: string]: any;
      }
    | string;
}

interface Link {
  path: string | linkPath;
  isExternal?: boolean;
  color?: string;
  hoverColor?: string;
  textSize?: number;
  text: string;
  letterSpacing?: number;
  onClick?: () => void;
  disabled?: boolean;
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

  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';

  [props: string]: any;
}

const Link: React.FC<Link> = ({
  path,
  isExternal = false,
  color,
  hoverColor,
  textSize = 16,
  text,
  letterSpacing = 1,
  onClick,
  disabled = false,
  fontWeight = 'normal',
  target,

  ...props
}: Link) => (
  <>
    {isExternal && typeof path === 'string' ? (
      <StyledAnchor
        href={path}
        textSize={textSize}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
        target={target}
        color={color}
        hoverColor={hoverColor}
        onClick={onClick}
        disabled={disabled}
      >
        {props.children}
        {text}
      </StyledAnchor>
    ) : (
      <StyledLink
        to={path}
        textSize={textSize}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
        color={color}
        hoverColor={hoverColor}
        onClick={onClick}
        disabled={disabled}
      >
        {props.children}
        {text}
      </StyledLink>
    )}
  </>
);

export default Link;
