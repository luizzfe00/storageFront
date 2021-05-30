import { useField } from 'formik';
import React, { useState, useCallback, useEffect } from 'react';

import {
  DropEvent,
  FileError,
  FileRejection,
  useDropzone,
} from 'react-dropzone';

import { icons } from '../../../../assets/icons';
import { config } from '../../../../config';
import FileUpload from './FileUpload';

import { DropContainer, Container } from './styles';

const MAX_IMAGE_SIZE = config.maxImageSize;
const MAX_FILES = config.maxFiles;

const imagesTypes = ['image/png', 'image/jpg', 'image/jpeg'];

interface Props {
  disabled?: boolean;
  text?: string;
  name: string;
}

export interface UploadedFile {
  file: File;
  errors: FileError[];
  url?: string;
}

const ImageDropzone: React.FC<Props> = ({ disabled, text, name }) => {
  const [_inputProps, _metaProps, helperProps] = useField(name);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  useEffect(() => {
    helperProps.setValue(files);
  }, [files]);

  const handleDelete = (file: File) => {
    setFiles((curr) => curr.filter((item) => item.file !== file));
  };

  const handleUpload = (file: File, url: string) => {
    setFiles((curr) =>
      curr.map((item) => {
        if (item.file === file) return { ...item, url };
        return item;
      }),
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: imagesTypes,
    maxSize: MAX_IMAGE_SIZE,
    maxFiles: MAX_FILES,
  });

  return (
    <Container>
      <DropContainer {...getRootProps()} disabled={disabled}>
        <input {...getInputProps()} />
        <span>{text}</span>
        {icons.upload}
      </DropContainer>

      {files.map((item, index) =>
        !!item.errors.length ? (
          <FileUpload
            key={index}
            file={item.file}
            error
            errors={item.errors}
            onDelete={handleDelete}
            onUpload={handleUpload}
          />
        ) : (
          <FileUpload
            key={index}
            file={item.file}
            onDelete={handleDelete}
            onUpload={handleUpload}
          />
        ),
      )}
    </Container>
  );
};

export default ImageDropzone;
