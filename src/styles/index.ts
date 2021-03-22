import styled from 'styled-components';
import { colors } from './colors';

export const PageContent = styled.main`
  width: 100%;
  height: 100%;
  padding: 64px 32px;
`;

export const StyledScrollY = `
  ::-webkit-scrollbar {
    background-color: ${colors.scrollbar};
    width: 5px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.scrollbarThumb};
    border-radius: 10px;
  }
`;
