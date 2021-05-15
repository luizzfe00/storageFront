import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  display: grid;
  gap: 14px;
  grid-template:
    'code code name name'
    'value value qtd active'
    'size size size size'
    'image image image image'
    'button button button button';
  grid-template-columns: 1fr 200px 200px 1fr;

  background-color: ${colors.white};
  border-radius: 7px;
  padding: 24px;

  @media screen and (max-width: 900px) {
    grid-template:
      'code code'
      'name name'
      'value qtd'
      'active active'
      'size size'
      'image image';
    grid-template-columns: 1fr 1fr;
  }
`;

export const SizeContainer = styled.div`
  grid-area: size;
  display: grid;
  grid-template-columns: 200px 1fr;
`;

export const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* @media screen and (max-width: 800px) {
    flex-direction: column;
  } */
`;
