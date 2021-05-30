import React, { useEffect, useState } from 'react';
import { FileError } from 'react-dropzone';

import ProgressBar from '../../ProgressBar';
import FileHeader from './FileHeader';

import {
  FileUploadContainer,
  Preview,
  FileContainer,
  ErrorMessage,
} from './styles';

export interface FileUploadProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
  error?: boolean;
  errors?: FileError[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onDelete,
  onUpload,
  error,
  errors,
}: FileUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileURL] = useState('');

  useEffect(() => {
    const upload = async () => {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
    };

    upload();
  }, []);

  const uploadFile = (file: File, onProgress: (percentage: number) => void) => {
    const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
    const key = 'docs_upload_example_us_preset';

    return new Promise<string>((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        res(response.secure_url);
        setFileURL(response.secure_url);
      };
      xhr.onerror = (event) => rej(event);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          onProgress(Math.round(percentage));
        }
      };

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', key);
      xhr.send(formData);
    });
  };

  const getColor = (): string => {
    if (error) return '#DC143C';
    else if (progress === 100) return '#32CD32';
    else return '#6495ED';
  };

  const getErrorMessage = (error: FileError) => {
    switch (error.code) {
      case 'file-invalid-type':
        return 'O arquivo deve ser algum dentre os tipos: image/png, image/jpg, image/jpeg.';
      case 'too-many-files':
        return 'Você excedeu o número de imagens permitido.';
      case 'file-too-large':
        return 'O arquivo execedeu o tamanho máximo de 1MB.';
      default:
        return 'Erro!';
    }
  };

  return (
    <FileUploadContainer>
      <Preview src={fileURL} />
      <FileContainer>
        <FileHeader file={file} onDelete={() => onDelete(file)} />
        <ProgressBar
          width={progress}
          value={progress}
          max={100}
          color={getColor()}
          error={error}
        />
        {errors?.map((error, index) => (
          <ErrorMessage key={index}>{getErrorMessage(error)}</ErrorMessage>
        ))}
      </FileContainer>
    </FileUploadContainer>
  );
};

export default FileUpload;
