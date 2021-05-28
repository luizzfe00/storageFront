import { lighten } from 'polished';
import React from 'react';
import { NavLink as Link, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { StyledScrollY } from '../../../styles';
import { colors } from '../../../styles/colors';

const transitionSpeed = '100ms';

interface RouteText {
  isSubroute?: boolean;
}

export const RouteText = styled.span<RouteText>`
  opacity: 0;
  margin-left: 1rem;

  transition: opacity 400ms ease-in-out;
`;

export const NavLogo = styled.li`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  width: 100%;
  margin-top: 24px;

  ${RouteText} {
    color: ${colors.black};
  }

  svg {
    transform: rotate(0deg);
    transition: ${transitionSpeed};
  }

  @media only screen and (max-width: 700px) {
    margin: 0 0 0 1.5rem;
  }
`;

export const NavItem = styled.li`
  width: 100%;
  white-space: nowrap;

  &:hover > * {
    color: ${colors.black};
  }

  &:last-child {
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 700px) {
    white-space: initial;

    &:not(:last-child) {
      border-bottom: 1px solid ${colors.navbarItemBorder};
    }
  }
`;

export const Nav = styled.nav`
  position: fixed;
  background-color: ${colors.white};
  color: ${colors.nonSelectedNavbarSVG};
  transition: width 600ms ease;
  z-index: 101;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 2px 0 rgba(0, 0, 0, 0.2);

  ${StyledScrollY}

  @media only screen and (max-width: 700px) {
    bottom: 0;
    width: 100vw;
    height: 4rem;

    overflow-y: hidden;
  }

  @media only screen and (min-width: 700px) {
    top: 0;
    width: 5rem;
    height: 100vh;

    &:hover {
      width: 16rem;

      ${RouteText} {
        opacity: 100%;
      }

      ${NavItem} {
        padding-right: 10px;
      }

      ${NavLogo} svg {
        ${RouteText} {
          left: 0px;
        }
      }
    }
  }
`;

const ItemStyle = `
  display: flex;
  align-items: center;

  height: 5rem;
  width: -webkit-fill-available;

  color: ${colors.blurredText};
  text-decoration: none;

  &,
  svg {
    transition: all ${transitionSpeed} ease-in-out;
  }

  svg {
    font-size: 1.3rem;
    min-width: 2rem;
    margin: 0 1.5rem;
  }

  &:hover {
    &,
    svg {
      color: ${colors.black};
    }
  }

  @media only screen and (max-width: 700px) {
    justify-content: flex-start;
    max-height: 48px;

    svg {
      width:  24px;
      height: 24px;
      margin: 0;
    }
  }
`;

interface INavLink extends NavLinkProps {
  hasIcon?: boolean;
}

export const NavLink = styled(Link)<INavLink>`
  ${ItemStyle}

  padding-left: ${({ hasIcon }) => (hasIcon ? 'initial' : '80px')};

  &.active,
  &.active svg {
    font-weight: bold;
    color: ${colors.black};
  }

  @media screen and (max-width: 700px) {
    padding-left: ${({ hasIcon }) => (hasIcon ? 'initial' : '0')};

    &.mobileMenuIcon {
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }
`;

export const NavNonRouteItem = styled.div<INavLink>`
  ${ItemStyle}

  cursor: default;
  padding-left: ${({ hasIcon }) => (hasIcon ? 'initial' : '80px')};

  @media screen and (max-width: 700px) {
    padding-left: ${({ hasIcon }) => (hasIcon ? 'initial' : '0')};
  }
`;

interface ExpandButtonContainer {
  isActive: boolean;
}

export const ExpandButtonContainer = styled.button<ExpandButtonContainer>`
  align-items: center;
  justify-content: center;

  display: none;
  background-color: transparent;
  border: none;
  color: ${colors.nonSelectedNavbarSVG};

  margin: auto;

  color: whitesmoke;

  height: 30px;
  width: 30px;

  padding: 5px;
  border-radius: 50%;

  outline: none !important;
  transition: all ${transitionSpeed} ease;

  svg {
    transition: transform ${transitionSpeed} ease;
    transform: rotate(${({ isActive }) => (isActive ? '-180' : '0')}deg);
  }

  &:hover {
    display: flex;
    background-color: ${colors.transparencyShadow};
  }
`;

interface SubRoutesContainer {
  isActive: boolean;
  qtd: number;
}

export const SubRoutesContainer = styled.div<SubRoutesContainer>`
  background-color: ${lighten(0.05, colors.secondary)};

  display: flex;
  flex-direction: column;

  overflow: hidden;

  transition: all 300ms ease-in-out;

  height: ${({ isActive, qtd }) => (isActive ? qtd * 60 : 0)}px;
  width: 100%;

  @media screen and (max-width: 700px) {
    height: ${({ isActive, qtd }) => (isActive ? qtd * 48 : 0)}px;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MasterItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  margin: 16px 16px 16px 10px;

  img {
    border: 3px solid ${colors.white};
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  svg {
    width: 48px !important;
    height: 48px !important;
  }

  span {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  @media only screen and (max-width: 700px) {
    img {
      width: 36px;
      height: 36px;
    }
  }
`;

export const NavbarList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-bottom: 0;

  @media only screen and (max-width: 700px) {
    flex-direction: row;

    li {
      border-bottom: none !important;

      a {
        justify-content: center !important;

        svg {
          width: 28px;
          height: 28px;
        }
      }
    }
  }
`;

export const Container = styled.div`
  @media only screen and (min-width: 700px) {
    &:not(:hover) ${SubRoutesContainer} {
      height: 0px;
    }

    &:hover {
      width: 16rem;

      ${RouteText} {
        opacity: 100%;
      }

      ${ExpandButtonContainer} {
        display: flex;
      }
    }
  }
`;

interface MobileMenuContainerInterface {
  show: boolean;
}

export const MobileMenuContainer = styled.div<MobileMenuContainerInterface>`
  position: fixed;
  background: ${colors.secondary};
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  bottom: ${({ show }) => (show ? 0 : '-100vh')};

  transition: bottom ease-in-out 200ms;

  li {
    max-width: 60%;
    list-style: none;
  }

  a {
    justify-content: flex-start;
    max-height: 48px;

    svg {
      width: 24px;
      height: 24px;
      margin: 0;
    }
  }

  ${RouteText} {
    opacity: 100%;
    font-size: 16px;
  }

  ${ExpandButtonContainer} {
    display: flex;
  }
`;

export const AllLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */

  max-height: 80vh;

  overflow-y: auto;

  ${StyledScrollY}
`;

export const CloseButton = styled.div`
  /* position: absolute;
  top: 16px;
  right: 16px; */
  margin-right: 64px;
  margin-left: auto;

  svg {
    width: 40px;
    height: 40px;
    color: ${colors.nonSelectedNavbarSVG};
  }

  svg:hover {
    color: ${colors.white};
  }
`;
