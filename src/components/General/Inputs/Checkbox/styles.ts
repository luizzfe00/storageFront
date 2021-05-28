import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
  margin-bottom: 0.125rem;
`;

export const StyledCheckbox = styled.input`
  border-radius: 0.25rem;
  float: left;
  margin-left: -1.5rem;

  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.25);
  appearance: none;

  cursor: pointer;

  &:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
    background-color: #0d6efd;
    border-color: #0d6efd;
  }
`;

export const Label = styled.label`
  display: inline-block;
  cursor: default;
`;
