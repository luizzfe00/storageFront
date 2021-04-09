import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  background: ${colors.background};
  font-family: 'Accord Alternate';
  padding: 0 40px;
  min-height: 100vh;
  position: relative;

  h1 {
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 25px;
    color: ${colors.black};
    margin-top: 16px;
    margin-bottom: 36px;
  }

  & > header {
    width: 100%;

    display: flex;

    & > *:not(:first-child) {
      position: absolute;
      right: 42px;

      margin-top: 16px;
      margin-bottom: 36px;
    }
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    padding: 44px 16px 80px 16px;
    margin-left: 0px;
    margin-bottom: 32px;

    h1 {
      text-align: center;
      margin-top: 0;
    }

    & > header {
      justify-content: center;

      & > *:not(:first-child) {
        margin: 0;
        right: 26px;
      }
    }
  }

  @media screen and (max-width: 450px) {
    padding: 44px 16px 80px 16px;
    margin-left: 0px;
    margin-bottom: 16px;

    h1 {
      margin-bottom: 16px;
    }
  }
`;
