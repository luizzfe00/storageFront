import React from 'react';

import Dropzone, { DropEvent } from 'react-dropzone';

import { icons } from '../../../../assets/icons';
import { config } from '../../../../config';

import { DropContainer, UploadMessage } from './styles';

const MAX_IMAGE_SIZE = config.maxImageSize;

const imagesTypes = ['image/png', 'image/jpg', 'image/jpeg'];

interface Props {
  onUpload: (files: any[], event: DropEvent) => void;
}

const Upload: React.FC<Props> = ({ onUpload }) => {
  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive)
      return <UploadMessage>Arraste os aquivos aqui...</UploadMessage>;

    if (isDragReject)
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;

    return (
      <UploadMessage type="success">Solte os aquivos aqui...</UploadMessage>
    );
  };

  return (
    <Dropzone
      accept={imagesTypes}
      onDropAccepted={onUpload}
      maxSize={MAX_IMAGE_SIZE}
    >
      {({ getInputProps, getRootProps, isDragActive, isDragReject }) => (
        <>
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
            {icons.upload}
          </DropContainer>
        </>
      )}
    </Dropzone>
  );
};

export default Upload;
