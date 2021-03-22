import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  main {
    padding: 20px;

    background-color: ${colors.white};
    box-shadow: 0 4px ${colors.primaryShadow};
    border-radius: 7px;
    align-items: center;
  }
`;
