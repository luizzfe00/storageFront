import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  height: 100px;
`;

export const ContentContainer = styled.div`
  background: linear-gradient(rgba(225, 225, 225, 0), rgba(225, 225, 225, 1));
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  height: 100%;

  svg {
    height: auto;
    width: 30px;
  }

  div {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-left: 16px;

    h1 {
      color: ${colors.black};
      font-size: 25px;
      font-weight: 700;
      letter-spacing: 1px;
      line-height: 25px;
      margin-right: 16px;
      margin-left: 8px;
    }

    button {
      height: 47px;
      width: 156px;
      border-radius: 10px;
      background-color: ${colors.completeRegisterButton};
      border: none;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.6px;
      line-height: 15px;
      color: ${colors.white};
      text-transform: uppercase;
    }
  }

  @media screen and (max-width: 650px) {
    svg {
      height: 125%;
      max-width: 270px;
    }
  }

  @media screen and (max-width: 550px) {
    height: auto;

    div {
      display: none;
    }
  }
`;

export const FullSizeButton = styled.div`
  display: none;
  margin-top: 8px;
  border-radius: 0;

  @media screen and (max-width: 550px) {
    display: block;
  }

  button {
    width: 100%;
  }
`;
