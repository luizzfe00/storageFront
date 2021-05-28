import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2), 0 25px 30px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  padding: 24px;
`;

export const Hr = styled.hr`
  height: 1px;
  width: 96%;
  border: none;
  background-color: #ddd;
  margin: 1.5em auto;
`;

export const FirstContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

interface FlexContaierProps {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  padding?: number;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

export const FlexContainer = styled.div<FlexContaierProps>`
  display: flex;
  width: 100%;

  ${({ padding }) => (padding ? { padding } : '')}
  justify-content: ${({ justifyContent }) => justifyContent || 'unset'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'unset'};

  > div {
    margin-right: 0.6rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  padding: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const AddressContainer = styled.div`
  display: grid;
  grid-template:
    'street street street street'
    'comp num neigh zip'
    'city state . .';
  grid-template-columns: 1fr 160px 1fr 160px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
`;
