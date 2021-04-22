import styled from 'styled-components';
import { colors } from '../../../../styles/colors';

interface Container {
  block: boolean;
  inline: boolean;
  reverse: boolean;
  spaceBetween: boolean;
  verticalAligned: boolean;
  gap?: number;
  gridArea?: string;
}

export const Container = styled.div<Container>`
  display: flex;
  flex-direction: ${({ inline, reverse }) =>
    `${inline ? 'row' : 'column'}${reverse ? '-reverse' : ''}`};
  justify-content: ${({ spaceBetween }) =>
    spaceBetween ? 'space-between' : 'initial'};
  align-items: ${({ verticalAligned }) =>
    verticalAligned ? 'center' : 'initial'};

  height: fit-content;
  width: ${({ block }) => (block ? '100%' : 'fit-content')};
  /* gap: ${({ gap }) => (gap ? `${gap}px` : '')}; */

  & > label {
    margin: 0
      ${({ gap, inline }) =>
        gap ? (inline ? `${gap / 2}px 0` : `0 ${gap / 2}px`) : ''};
  }

  grid-area: ${({ gridArea }) => gridArea || 'unset'};
`;

interface Label {
  textAlign?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  gap?: number;
}

export const Label = styled.label<Label>`
  margin: 0;
  padding: 0 5px;
  border-radius: 2px;
  gap: ${({ gap }) => (gap ? `${gap}px` : '')};

  font-size: ${({ fontSize }) => fontSize || '1rem'};
  color: ${({ color }) => color || colors.input};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};

  transition: all 200ms ease;

  text-align: ${({ textAlign }) => textAlign || 'unset'};

  user-select: none !important;
`;

interface ChildrenContainer {
  childrenHeight?: string;
  childrenWidth?: string;
}
export const ChildrenContainer = styled.div<ChildrenContainer>`
  ${({ childrenHeight }) => (childrenHeight ? { height: childrenHeight } : '')}
  ${({ childrenWidth }) => (childrenWidth ? { width: childrenWidth } : '')}
`;
