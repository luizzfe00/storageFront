import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../../../styles/colors';
import Backdrop from '../Backdrop';
import Button from '../Button';

import {
  ModalContainer,
  Modal as CustomModal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from './styles';

export interface BodyProps {
  isConfirmation?: boolean;

  title: string;
  bodyText?: string;
  content?: JSX.Element | React.FC<any>;

  confirmText?: string;
  closeText?: string;
  cancelText?: string;

  firstButtonBg?: string;
  secondButtonBg?: string;

  footerless?: boolean;
  footerComponent?: JSX.Element;
}

export interface ActionModalProps extends BodyProps {
  handleConfirm?: Function;
  handleCancel?: Function;
  handleCloseModal?: Function;
  handleClickBackdrop?: Function;
}

const ActionModal: React.FC<ActionModalProps> = ({
  isConfirmation = false,
  title,
  bodyText = '',
  content,
  confirmText = 'Confirmar',
  closeText = 'Fechar',
  cancelText = 'Cancelar',
  firstButtonBg,
  secondButtonBg,
  footerless,
  footerComponent,
  handleCancel,
  handleClickBackdrop,
  handleCloseModal,
  handleConfirm,
}: ActionModalProps) => {
  const [show, setShow] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // const pinModal = () => {
  //   document.body.style.position = 'fixed';
  //   document.body.style.top = `-${window.scrollY}px`;
  // };

  // const unPinModal = () => {
  //   document.body.style.position = '';
  //   document.body.style.top = '';
  // };

  const handleClose = () => {
    // unPinModal();

    if (isConfirmation && handleClickBackdrop) handleClickBackdrop();
    else if (handleCloseModal) handleCloseModal();

    setShow(false);
  };

  const handleCancelClick = () => {
    // unPinModal();

    if (isConfirmation && handleCancel) handleCancel();

    setShow(false);
  };

  const handleConfirmClick = () => {
    // unPinModal();

    if (isConfirmation && handleConfirm) handleConfirm();
    else if (handleCloseModal) handleCloseModal();

    setShow(false);
  };

  const handleClick = (event: any) => {
    if (modalRef.current !== null) {
      if (modalRef.current.contains(event.target)) {
        return;
      }

      // outside click
      setShow(false);
      handleClose();
    }
    // unPinModal();
  };

  useEffect(() => {
    // pinModal();
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
      <ModalContainer innerRef={modalRef} show={show} onHide={handleClose}>
        <CustomModal>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalBody>{content ?? bodyText}</ModalBody>
          {!footerless && (isConfirmation || closeText) && (
            <ModalFooter>
              {!footerComponent ? (
                <>
                  {isConfirmation && (
                    <Button
                      color={colors.darkTextButton}
                      backgroundColor={secondButtonBg ?? colors.primaryShadow}
                      paddingRightLeft={16}
                      paddingUpDown={8}
                      textSize={16}
                      fontWeight={400}
                      onClick={handleCancelClick}
                      text={cancelText}
                    />
                  )}
                  <Button
                    paddingRightLeft={16}
                    paddingUpDown={8}
                    textSize={16}
                    backgroundColor={firstButtonBg ?? colors.confirmButton}
                    color={colors.lightTextButton}
                    fontWeight={400}
                    onClick={handleConfirmClick}
                    text={isConfirmation ? confirmText : closeText}
                  />
                </>
              ) : (
                footerComponent
              )}
            </ModalFooter>
          )}
        </CustomModal>
      </ModalContainer>
      {show && <Backdrop onClick={handleClose} />}
    </>
  );
};

export default ActionModal;
