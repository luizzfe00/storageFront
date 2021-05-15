import styled from 'styled-components';

export const Container = styled.div`
  padding-right: 40px;

  @media screen and (max-width: 700px) {
    padding-right: 0;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;

  & > div {
    min-width: 300px;
  }

  @media screen and (max-width: 500px) {
    & > div {
      min-width: 100%;
    }
  }
`;
