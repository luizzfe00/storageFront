import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  background-color: ${colors.white};
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2), 0 25px 30px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  padding: 24px;
  display: flex;
  flex-direction: column;

  img {
    max-width: 500px;
    height: auto;
    margin: 0 auto;
    border-radius: 10px;
  }
`;

export const InfoContainer = styled.div`
  padding: 10px;
  margin: 3rem 0;

  font-weight: bold;
  font-size: 18px;

  border-radius: 7px;

  background-color: ${colors.offerInfoBackground};
  max-width: 800px;
  width: 60%;
  align-self: center;
`;

export const ValueContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(100px, 200px) 1fr;
  padding: 5px 10px;
`;

export const Value = styled.div`
  background-color: ${colors.background};
  max-width: min-content;
  padding: 10px;
  border-radius: 10px;
  margin-left: 1rem;
`;
