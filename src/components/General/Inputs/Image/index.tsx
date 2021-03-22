import 'cropperjs/dist/cropper.css';

import React, {
  useState,
  useEffect,
  useCallback,
  InputHTMLAttributes,
} from 'react';

import Cropper from 'react-cropper';
import { useDropzone } from 'react-dropzone';
import { config } from '../../../../config';
import UtilsFunctions from '../../../../utils';
import Button from '../../Button';
import Text from '../../Text';

import { Container, Dropzone, ContentContainer } from './styles';

interface Image extends InputHTMLAttributes<HTMLInputElement> {
  url?: string;

  short?: boolean;
  block?: boolean;

  readOnly?: boolean;

  content?: JSX.Element;

  validate?: boolean;
  validated?: boolean;
  validation?: Function;

  onFileUpload: (url: string, file?: File) => void;

  previewer?: string;
}

const MAX_IMAGE_SIZE = config.maxImageSize;

const Image: React.FC<Image> = ({
  url = '',
  short,
  block,
  content,

  readOnly = false,

  validate = false,
  validated = false,
  validation,

  onFileUpload,

  previewer,
  ...props
}: Image) => {
  const [invalidation, setInvalidation] = useState('');
  const [imageType, setImageType] = useState('');
  const [image, setImage] = useState('');
  const [cropper, setCropper] = useState<any>();
  const [imagePreLoaded, setImagePreLoaded] = useState(true);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (readOnly) return;

      if (acceptedFiles.length) {
        const file = acceptedFiles[0];

        setImageType(file.type);

        const fileUrl = URL.createObjectURL(file);

        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as any);
        };

        reader.readAsDataURL(acceptedFiles[0]);

        if (validate && validated && validation)
          setInvalidation(validation(fileUrl));

        onFileUpload(fileUrl, file);
        setImagePreLoaded(false);
      } else {
        console.log('erro');
      }
    },
    [onFileUpload, readOnly, validate, validated],
  );

  useEffect(() => {
    if (validate && validated && validation) setInvalidation(validation(url));
  }, [validated]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/png', 'image/jpg', 'image/jpeg'],
    maxSize: MAX_IMAGE_SIZE,
    disabled: readOnly,
  });

  const ImageRemoveHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (validate && validated && validation) setInvalidation(validation(''));

    onFileUpload('', undefined);
  };

  useEffect(() => {
    if (url) setImage(url);
  }, [url]);

  useEffect(() => {
    if (typeof cropper !== 'undefined') {
      if (imagePreLoaded) {
        cropper.disable();
      } else {
        cropper.reset();
        cropper.enable();
      }
    }
  }, [imagePreLoaded]);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const base64AndType = cropper.getCroppedCanvas().toDataURL();
      const base64 = base64AndType.split('base64,')[1];
      const imageURL = UtilsFunctions.base64toBlobURL(base64, imageType);
      const file = UtilsFunctions.dataURLtoFile(base64AndType, '1');

      onFileUpload(imageURL, file);
      setImagePreLoaded(true);
    }
  };

  return (
    <Container block={block} short={short}>
      <Dropzone {...getRootProps()}>
        {!readOnly && !url && (
          <input
            {...props}
            {...getInputProps()}
            accept="image/jpeg, image/png, image/jpg"
          />
        )}

        <ContentContainer
          title={invalidation}
          short={short}
          isValid={!invalidation}
          disabled={readOnly}
        >
          {url ? (
            <>
              <Cropper
                style={{ height: 'auto', width: '100%' }}
                initialAspectRatio={1}
                preview={previewer ? `.${previewer}` : undefined}
                src={image}
                viewMode={1}
                guides
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(instance: any) => {
                  setCropper(instance);
                }}
                className="cropperBox"
              />
            </>
          ) : (
            content || (
              <>
                <strong>Arraste o arquivo para cá</strong>
                <span>ou</span>
                <strong>Selecione um arquivo</strong>
              </>
            )
          )}
        </ContentContainer>
      </Dropzone>
      {!readOnly && url && (
        <>
          <Button
            type="button"
            onClick={ImageRemoveHandle}
            text="Alterar"
            paddingUpDown={8.5}
          />
          {imagePreLoaded === false ? (
            <Button
              type="button"
              paddingRightLeft={0}
              onClick={getCropData}
              text="Confirmar Corte"
              paddingUpDown={8.5}
            />
          ) : null}
        </>
      )}
      <Text.Mute>{`A imagem escolhida deve estar no formato PNG ou JPG e conter
      no máximo 1MB de tamanho.`}</Text.Mute>
    </Container>
  );
};

export default Image;
