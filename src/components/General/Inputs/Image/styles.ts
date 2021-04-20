import styled, { css } from 'styled-components';
import { colors } from '../../../../styles/colors';

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

interface DropContainerProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

export const DropContainer = styled.div<DropContainerProps>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  align-items: center;

  min-height: 70px;

  transition: height 0.2s ease;

  ${({ isDragActive }) => isDragActive && dragActive}
  ${({ isDragReject }) => isDragReject && dragReject}

  svg {
    width: 32px;
    height: 32px;
  }

  p {
    margin: 5px 0;
  }
`;

interface MessageProps {
  type?: string;
}

const messageColors: { [type: string]: string } = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p<MessageProps>`
  display: flex;
  color: #999;
  color: ${({ type }) => (type ? messageColors[type] : messageColors.default)};
`;

export const InfoContainer = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: '#444444';

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: '#999999';
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: '#e57878';
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

interface PreviewProps {
  src: any;
}

export const Preview = styled.div<PreviewProps>`
  width: 72px;
  height: 72px;
  border-radius: 5px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 10px;
  background: 4px;
  border-radius: 4px;
  padding: 10px;
`;
