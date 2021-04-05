import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  display: grid;
  gap: 14px;
  grid-template:
    'id id id'
    'name name name'
    'value qtd active'
    'image image image'
    'button button button';
  grid-template-columns: 1fr 100px 1fr;

  > div:nth-child(5) {
    width: 100%;
    align-items: center;
  }

  z-index: 51;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 7px;
  padding: 24px;
  min-width: 50vw;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  grid-area: button;

  button {
    margin-left: 1rem;
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
