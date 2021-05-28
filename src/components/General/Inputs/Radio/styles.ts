import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 0.125rem;
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
`;

interface Radio {
  radioColor?: string;
}

export const StyledRadio = styled.input<Radio>`
  background-color: #fff;
  border-radius: 50%;
  float: left;
  margin-left: -1.5rem;
  width: 1em;
  height: 1em;
  margin-top: 0.25rem;
  vertical-align: top;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.25);
  appearance: none;

  cursor: pointer;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
    background-color: ${({ radioColor }) => radioColor || '#0d6efd'};
    border-color: ${({ radioColor }) => radioColor || '#0d6efd'};
  }
`;

interface LabelProps {
  fontWeight?: number | string;
  fontSize?: number;
}

export const Label = styled.label<LabelProps>`
  display: inline-block;
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
  font-size: ${({ fontSize }) => `${fontSize}px` || 'inherit'};
`;
