import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled, { AnyStyledComponent } from 'styled-components';

interface LinkInterface {
  color?: string;
  hoverColor?: string;
  textSize: number;
  letterSpacing: number;
  fontWeight:
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
  disabled?: boolean;
}

interface DomLink extends LinkInterface, LinkProps {}

const StyledElement = (props: LinkInterface) => `
  color: ${props.color};
  font-size: ${props.textSize}px;
  line-height: ${props.textSize + 3}px;
  text-decoration: none;
  letter-spacing: ${props.letterSpacing}px;
  fontWeight: ${props.fontWeight}
  transition: all 100ms ease;
  font-family: 'Accord Alternate', sans-serif;

  &:hover {
    color: ${props.hoverColor};
  }

  ${props.disabled && 'pointer-events: none; cursor: not-allowed;'}
`;

export const StyledLink = styled(
  ({
    color: _color,
    hoverColor: _hoverColor,
    textSize: _textSize,
    letterSpacing: _letterSpacing,
    fontWeight: _fontWeight,
    disabled: _disabled,
    ...rest
  }: DomLink) => null,
)<LinkInterface>`
  ${(props) => StyledElement(props)}
`;

export const StyledAnchor = styled.a<LinkInterface>`
  ${(props) => StyledElement(props)}
`;

interface NonStyledLinkInterface {
  disabled?: boolean;
}

const NonStyledElement = (props: NonStyledLinkInterface) => `
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;

  }
  ${props.disabled ? 'pointer-events: none; cursor: not-allowed;' : ''}
`;

export const NonStyledLink = styled(
  ({ disabled: _, ...rest }: NonStyledLinkInterface & LinkProps) => null,
)<NonStyledLinkInterface>`
  ${(props) => NonStyledElement(props)}
`;

export const NonStyledAnchor = styled.a<NonStyledLinkInterface>`
  ${(props) => NonStyledElement(props)}
`;
