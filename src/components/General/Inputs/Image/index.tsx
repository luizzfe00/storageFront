import React from 'react';

import { DropEvent } from 'react-dropzone';
import { Image } from '../../../../interfaces/product';
import FileList from './FileList';
import { Container, Content } from './styles';

import Upload from './Upload';

interface Props {
  files: Image[];
  onUpload: (files: any[], event: DropEvent) => void;
  handleDelete: (file: any) => void;
  disabled?: boolean;
}

const ImageDropzone: React.FC<Props> = ({
  onUpload,
  files,
  handleDelete,
  disabled,
}) => (
  <Container>
    <Content>
      <Upload onUpload={onUpload} disabled={disabled} />
      {!!files.length && <FileList files={files} onDelete={handleDelete} />}
    </Content>
  </Container>
);

export default ImageDropzone;
