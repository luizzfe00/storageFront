import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import { icons } from '../../../../assets/icons';
import { Image } from '../../../../interfaces/product';
import { InfoContainer, FileInfo, Preview } from './styles';

interface Props {
  files: Image[];
  onDelete: (file: any) => void;
}

const FileList: React.FC<Props> = ({ files, onDelete }) => {
  return (
    <>
      {!!files && (
        <InfoContainer>
          {files.map(
            (file: any) =>
              !!file && (
                <li key={file.id}>
                  <FileInfo>
                    <Preview src={file.url} />
                    <div>
                      <strong>{file.name}</strong>
                      <span>
                        {file.readableSize}{' '}
                        {!!file.url && (
                          <button onClick={() => onDelete(file.id)}>
                            Excluir
                          </button>
                        )}
                      </span>
                    </div>
                  </FileInfo>

                  <div>
                    {!file.uploaded && !file.error && (
                      <CircularProgressbar
                        styles={{
                          root: { width: 24 },
                          path: { stroke: '#7159c1' },
                        }}
                        strokeWidth={10}
                        text={`${file.progress}%`}
                        value={file.progress}
                      />
                    )}

                    {file.url && (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    )}

                    {file.uploaded && icons.checkCircle}
                    {file.error && icons.errorCircle}
                  </div>
                </li>
              ),
          )}
        </InfoContainer>
      )}
    </>
  );
};

export default FileList;
