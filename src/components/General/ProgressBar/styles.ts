import styled from 'styled-components';

interface ContainerProps {
  width: number;
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 1fr 80px;

  align-items: center;

  progress[value] {
    width: ${({ width }) => `${width}%`};
    appearance: none;

    ::-webkit-progress-bar {
      height: 10px;
      border-radius: 20px;
      background-color: #eee;
    }

    ::-webkit-progress-value {
      background-color: ${({ color }) => color || '#6495ED'};
      height: 10px;
      border-radius: 20px;
    }
  }

  span {
    text-align: center;
    font-weight: bold;
    margin: auto;
  }

  svg {
    margin: auto;
  }
`;
