import styled from 'styled-components';
import { colors } from '../../../styles/colors';

interface ContainerProps {
  show: boolean;
  onHide: () => void;

  [props: string]: any;
}

export const ModalContainer = styled.div<ContainerProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  margin: auto;
  z-index: 51;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: ${colors.white};
  border-radius: 7px;
  padding: 24px;
  min-width: 50vw;

  @media screen and (max-width: 1100px) {
    min-width: 70vw;
  }

  @media screen and (max-width: 700px) {
    min-width: 90vw;
  }
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-clip: padding-box;
  outline: 0;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
`;

export const ModalTitle = styled.h4`
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ModalBody = styled.div`
  flex: 1 1 auto;
  padding: 1rem;
  margin-top: 0;

  text-align: center;
`;

export const ModalFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;

  justify-content: center;

  button {
    width: fit-content;
  }

  button:last-child {
    margin-left: 16px;
  }
`;
