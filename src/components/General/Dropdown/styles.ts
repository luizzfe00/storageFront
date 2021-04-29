import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledScrollY } from '../../../styles';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  position: relative;
`;

interface ItemsContainer {
  isOpen: boolean;
  largestOption: number;
}

export const ItemsContainer = styled.ul<ItemsContainer>`
  position: absolute;

  display: ${({ isOpen }) => (isOpen ? 'inline-block' : 'none')};

  list-style: none;

  background-color: ${colors.dropdownBackground};
  border: 1px solid ${colors.grayBorder};
  border-radius: 4px 0 4px 4px;
  padding: 8px 0px;
  transition: height 1s ease-in-out;
  z-index: 2;

  overflow: auto;
  ${StyledScrollY}

  min-width: ${({ largestOption }) => largestOption + 6}ch;
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0px')};

  box-shadow: 0px 2px 5px 2px ${colors.secondaryShadow};
`;

const ItemContainer = `
  display: flex;
  align-items: center;

  & > * {
    margin-right: 5px;
  }

  width: 100%;
  padding: 0.35rem 1rem;

  font-weight: 400;
  color: ${colors.offerInfoText};
  text-align: left;
  white-space: nowrap;

  background-color: transparent;
  border: 0;

  transition: background-color 100ms ease-in-out;

  cursor: pointer;

  font-size: 1rem;

  &:hover {
    background-color: ${colors.inputBorder};
  }

  @media (max-width: 1000px) {
    font-size: 1.1rem;
    padding: 0.7rem 1rem;
    margin: 5px 0;
  }
`;

export const ItemContainerButton = styled.button`
  ${ItemContainer}
`;

export const ItemContainerLink = styled(Link)`
  ${ItemContainer}
`;

export const ItemContainerAnchor = styled.a`
  ${ItemContainer}
`;
