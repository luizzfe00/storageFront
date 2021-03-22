import { lighten } from 'polished';
import styled from 'styled-components';
import { colors } from '../../../../styles/colors';

interface ContainerInterface {
  textWidth: number;
  isOnLeft: boolean;
  offColor?: string;
  activeColor?: string;
  textWidthLeft: number;
  textWidthRight: number;
  disabled?: boolean;
  fontSize?: number;
  height?: number;
  width?: number;
  marginAuto: boolean;
}

export const Container = styled.div<ContainerInterface>`
  background-color: ${({ isOnLeft, offColor, activeColor, disabled }) =>
    !isOnLeft
      ? disabled
        ? lighten(0.2, `${offColor || colors.Off}`)
        : `${offColor || colors.Off}`
      : disabled
      ? lighten(0.2, `${activeColor || colors.confirmButton}`)
      : `${activeColor || colors.confirmButton}`};

  border-radius: ${({ height }) => `${(height && height / 2 + 1) || 20}px`};
  width: ${({ width }) => (width ? `${2 * width}px` : 'fit-content')};
  max-width: 100%;
  padding: 2px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  font-weight: bold;
  transition: all ease-in-out 200ms;
  height: ${({ height }) => `${height || 42}px`};
  font-size: ${({ fontSize }) => `${fontSize || 16}px`};
  user-select: none !important;

  margin: ${({ marginAuto }) => (marginAuto ? 'auto' : '')};

  ::before {
    content: '';
    width: ${({ width, textWidth }) =>
      width ? `${width}px` : `${`calc(${textWidth}ch + 35px)`}`};
    background-color: ${colors.white};
    height: ${({ height }) => `${(height && height - 6) || 36}px`};
    border-radius: ${({ height }) => `${(height && height / 2) || 20}px`};
    position: absolute;
    transition: all ease-in-out 200ms;
    padding: 1px;

    ${({ isOnLeft, textWidth, width }) =>
      !isOnLeft
        ? `left: 4px;`
        : width
        ? `left: calc(100% - ${width}px - 6px);`
        : `left: calc(100% - ${textWidth}ch - 44px);`}
  }

  span {
    border-radius: 20px;
    padding: 5px 0px;
    z-index: 1;
    text-align: center;

    &:first-child {
      color: ${({ isOnLeft }) => (isOnLeft ? colors.white : colors.Off)};
      width: ${({ textWidthLeft }) => `calc(${textWidthLeft - 2}ch + 48px)`};
    }

    &:last-child {
      color: ${({ isOnLeft }) => (!isOnLeft ? colors.white : colors.Off)};
      width: ${({ textWidthRight }) => `calc(${textWidthRight - 2}ch + 48px)`};
    }
  }

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;
