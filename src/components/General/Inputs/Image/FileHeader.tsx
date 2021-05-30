import React from 'react';

import Button from '../../Button';

import { FileHeaderContainer } from './styles';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

const FileHeader: React.FC<FileHeaderProps> = ({
  file,
  onDelete,
}: FileHeaderProps) => {
  return (
    <FileHeaderContainer>
      <span>{file.name}</span>
      <Button
        text="Deletar"
        backgroundColor="#DC143C"
        value={file.name}
        onClick={() => onDelete(file)}
        paddingRightLeft={20}
        paddingUpDown={8}
        textSize={6}
        color="#FFF"
      />
    </FileHeaderContainer>
  );
};

export default FileHeader;
