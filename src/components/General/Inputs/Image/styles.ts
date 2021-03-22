import styled from 'styled-components';
import { colors } from '../../../../styles/colors';

interface Container {
  short?: boolean;
  block?: boolean;
}

export const Container = styled.div<Container>`
  width: ${({ block }) => (block ? '100%' : '500px')};
  height: fit-content;

  display: flex;
  flex-direction: column;

  button {
    margin-top: 12px;
    width: 100%;
    height: 42px;
  }

  & > :last-child {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

export const Dropzone = styled.div`
  outline: none !important;
`;

interface ContentContainer {
  disabled?: boolean;
  short?: boolean;
  isValid: boolean;
}

export const ContentContainer = styled.div<ContentContainer>`
  position: relative;

  display: flex;
  flex-direction: ${({ short }) => (short ? 'row' : 'column')};
  justify-content: center;
  align-items: center;

  border: 1.5px dashed
    ${({ isValid }) => (isValid ? colors.inputBorder : colors.invalidBorder)};
  border-radius: 10px;

  transition: all 300ms ease-in-out;

  max-width: 100%;
  min-height: ${({ short }) => (short ? '150px' : '200px')};
  height: ${({ short }) => (short ? '150px' : '-webkit-fill-available')};

  background: transparent;

  button {
    position: absolute;
    width: 50px;
    height: 42px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 100% !important;
    height: -webkit-fill-available;
  }

  span {
    ${({ short }) => (short ? 'margin: 0 10px' : '')};
    font-weight: 300;
  }

  strong,
  span {
    text-align: center;
    font-family: 'Accord Alternate';
    color: ${colors.input};
  }

  &,
  &:focus {
    outline: none !important;
  }

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};
    user-select: none;
    box-shadow: ${({ isValid }) => `0 0 0 4px
      ${isValid ? colors.primaryShadow : `${colors.invalidBorder}33`}`};
  }

  .cropperBox {
    max-height: 100%;
    max-width: 100%;

    span {
      margin: 0 !important;
    }

    img {
      height: 100%;
      max-height: 150px;
    }
  }
`;

export const SelectedContainer = styled(ContentContainer)`
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
