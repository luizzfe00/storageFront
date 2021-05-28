import styled from 'styled-components';
import { colors } from '../../../../styles/colors';

interface Container {
  fontSize?: number | string;
  maxWidth?: string;
}

export const Container = styled.p<Container>`
  color: ${colors.mutedText};
  font-size: ${({ fontSize }) => fontSize ?? '12px'};
  font-weight: 200;
  line-height: 12px;

  max-width: ${({ maxWidth }) => maxWidth ?? ''};
`;
