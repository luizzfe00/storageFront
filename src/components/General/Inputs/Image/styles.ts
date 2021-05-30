import styled from 'styled-components';
import { colors } from '../../../../styles/colors';
interface DropContainerProps {
  disabled?: boolean;
}

export const DropContainer = styled.div<DropContainerProps>`
  border: 1px dashed
    ${({ disabled }) =>
      disabled ? `${colors.invalidBorder}` : `${colors.lightGray}`};
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  display: flex;
  flex-direction: column;
  width: 80%;

  margin-top: 10px;

  justify-content: center;
  align-items: center;

  min-height: 70px;

  transition: height 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  > span {
    font-weight: bold;
    margin-bottom: 4px;
  }
`;

interface PreviewProps {
  src: any;
}

export const Preview = styled.div<PreviewProps>`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 12px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileUploadContainer = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
`;

export const FileHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  width: calc(100% - 80px);

  > span {
    margin-right: 8px;
    font-weight: bold;
  }
`;

export const FileContainer = styled.div`
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: crimson;
`;
