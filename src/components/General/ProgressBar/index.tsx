import React from 'react';

import { icons } from '../../../assets/icons';

import { Container } from './styles';

export interface ProgressBarProps {
  width: number;
  color?: string;
  value: number;
  max: number;
  error?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  width,
  color,
  max,
  value,
  error,
}: ProgressBarProps) => {
  const renderIcon = (): JSX.Element => {
    if (error) return <>{icons.errorCircle}</>;
    else return <>{icons.checkCircle}</>;
  };

  return (
    <Container width={width} color={color}>
      <progress value={value} max={max} />
      {value === 100 ? (
        <>{renderIcon()}</>
      ) : (
        <span>{(value / max) * 100}%</span>
      )}
    </Container>
  );
};

export default ProgressBar;
