import React from 'react';
import ReactDOM from 'react-dom';
import ActionModal, { BodyProps } from './Modal';

export const confirmModal = async (props: BodyProps): Promise<boolean> => {
  return new Promise((resolve) => {
    const handleConfirm = () => resolve(true);
    const handleCancel = () => resolve(false);
    const handleClickbackdrop = () => resolve(false);

    const containerConfig = {
      ...props,
      isConfirmation: true,
      handleConfirm,
      handleCancel,
      handleClickbackdrop,
    };

    const containerDomNode = document.createElement('div');

    document.body.appendChild(containerDomNode);
    ReactDOM.render(
      React.createElement(ActionModal, { ...containerConfig }),
      containerDomNode,
    );
  });
};

export const infoModal = async (props: BodyProps): Promise<boolean> => {
  return new Promise((resolve) => {
    const handleCloseModal = () => resolve(true);

    const containerConfig = { ...props, handleCloseModal };

    const containerDomNode = document.createElement('div');

    document.body.appendChild(containerDomNode);

    ReactDOM.render(
      React.createElement(ActionModal, { ...containerConfig }),
      containerDomNode,
    );
  });
};
