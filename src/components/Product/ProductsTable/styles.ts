import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
  }

  button {
    margin-left: 1em;
  }

  main {
    padding: 20px;

    background-color: ${colors.white};
    box-shadow: 0 4px ${colors.primaryShadow};
    border-radius: 7px;
    align-items: center;
  }
`;

export const ModalContainer = styled.div`
  display: grid;
  gap: 14px;
  grid-template:
    'id id id'
    'name name name'
    'value qtd active'
    'image image image';
  grid-template-columns: 1fr 100px 1fr;

  > div:nth-child(5) {
    width: 100%;
    align-items: center;
  }
`;

export const ImageInputContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 2em;
  }
`;
