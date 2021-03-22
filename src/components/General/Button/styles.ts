import { lighten, opacify, desaturate } from 'polished';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

interface Container {
  block?: boolean;
  color?: string;
  backgroundColor?: string;
  textSize: number;
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
  paddingUpDown: number;
  paddingRightLeft: number;
  letterSpacing: number;
  noBorderRadius?: boolean;
  borderRadiusPx?: string;
  borderColor?: string;
  iconOnly?: boolean;
  marginAuto?: boolean;
  noWrap?: boolean;
  areaName?: string;
  isLoading?: boolean;
  marginUpDown?: number;
  marginRightLeft?: number;
}

export const Container = styled.button<Container>`
  width: ${({ block }) => (block ? '100%' : 'fit-content')};
  margin: ${({ marginAuto, marginUpDown, marginRightLeft }) =>
    marginAuto
      ? 'auto'
      : `${marginUpDown ? `${marginUpDown}px` : ''} ${
          marginRightLeft ? `${marginRightLeft}px` : ''
        }`};

  grid-area: ${({ areaName }) => areaName ?? 'unset'};

  font-family: 'Accord Alternate', sans-serif;
  transition: all 100ms ease;
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : 'none'};
  outline: none !important;
  z-index: 2;
  cursor: pointer;

  white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : '')};

  border-radius: ${({ noBorderRadius, borderRadiusPx }) =>
    noBorderRadius ? '' : borderRadiusPx ? `${borderRadiusPx}px` : '7px'};

  color: ${({ color }) => color || colors.white};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ textSize }) => `${textSize + 3}px`};
  letter-spacing: ${({ letterSpacing }) => `${letterSpacing}px`};

  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.primary};

  padding: ${({ paddingUpDown, paddingRightLeft }) =>
    `${paddingUpDown}px ${paddingRightLeft}px`};

  box-shadow: 0px 2px 4px 0px
    ${({ backgroundColor }) =>
      backgroundColor
        ? opacify(0.2, backgroundColor)
        : opacify(0.2, colors.primary)};

  svg {
    margin-right: ${({ iconOnly }) => (iconOnly ? '0' : '8px')};
    height: ${({ textSize }) => `${textSize}px`};
    width: auto;
    display: flex;
    flex-shrink: 0;
    fill: ${({ color }) => color};
  }

  &:hover {
    background-color: ${({ backgroundColor }) =>
      backgroundColor
        ? lighten(0.01, backgroundColor)
        : lighten(0.01, colors.primary)};
  }

  &:disabled {
    background-color: ${({ backgroundColor }) =>
      backgroundColor
        ? desaturate(0.7, backgroundColor)
        : desaturate(0.7, colors.primary)};

    box-shadow: 0px 2px 4px 0px
      ${({ backgroundColor }) =>
        backgroundColor
          ? desaturate(0.7, backgroundColor)
          : desaturate(0.7, colors.primary)};

    cursor: not-allowed;
  }

  position: relative;
`;

interface Loading {
  isLoading: boolean;
}

export const Loader = styled.div<Loading>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

export const ButtonChildren = styled.div<Loading>`
  margin: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

interface StylelessContainer {
  margin?: string;
  padding?: string;
}

export const StylelessContainer = styled.button<StylelessContainer>`
  border: none;
  background-color: transparent;

  margin: ${({ margin }) => margin ?? ''};
  padding: ${({ padding }) => padding ?? ''};
`;
