import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 14px;
  grid-template:
    'id id id'
    'name name name'
    'value qtd active'
    'image image image';
  grid-template-columns: 1fr 100px 1fr;

  > div:nth-child(5) {
    width: 100%;
    align-items: center;
  }
`;

export const ImageInputContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 2em;
  }
`;
