import {} from '../../../utils';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { icons } from '../../../assets/icons';
import { ReactComponent as Logo } from '../../../assets/svg/squared.svg';
import { logout } from '../../../redux';
import { privateRouteList, RouteProps } from '../../../routes/routeList';

import {
  Container,
  MasterItemContainer,
  ItemContainer,
  NavLink,
  RouteText,
  Nav,
  NavItem,
  NavLogo,
  ImageContainer,
  NavbarList,
  MobileMenuContainer,
  CloseButton,
  AllLinks,
} from './styles';

const Navbar: React.FC = () => {
  const [expandMobileMenu, setExpandMobileMenu] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

  const dispatch = useDispatch();
  const history = useHistory();

  const systemItems = [...privateRouteList];

  const signOutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  useEffect(() => {
    if (expandMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [expandMobileMenu]);

  return (
    <Container>
      {!isMobile ? (
        <Nav>
          <NavbarList>
            <NavLogo>
              <NavLink to="/user/account" hasIcon>
                <ImageContainer>
                  <img src="https://picsum.photos/200" alt="" />
                  <RouteText>Nome</RouteText>
                </ImageContainer>
              </NavLink>
            </NavLogo>

            {systemItems
              .filter((item) => item.navbar)
              .map((item: RouteProps) => (
                <NavItem key={item.path}>
                  <Item item={item} />
                </NavItem>
              ))}

            <NavItem>
              <NavLink to="/" onClick={signOutHandler} hasIcon exact>
                {icons.exit}
                <RouteText>Sair</RouteText>
              </NavLink>
            </NavItem>
          </NavbarList>
        </Nav>
      ) : (
        <>
          <Nav>
            <NavbarList>
              <NavLogo>
                <NavLink to="/dashboard" hasIcon>
                  <ImageContainer>
                    <Logo />
                  </ImageContainer>
                </NavLink>
              </NavLogo>

              <NavItem>
                <NavLink
                  to={window.location.pathname}
                  onClick={() => setExpandMobileMenu(!expandMobileMenu)}
                  hasIcon
                  className="mobileMenuIcon"
                >
                  {icons.menu}
                </NavLink>
              </NavItem>

              <NavLogo>
                <NavLink to="/user/account" hasIcon>
                  <ImageContainer>
                    <img src="https://picsum.photos/200" alt="" />
                  </ImageContainer>
                </NavLink>
              </NavLogo>
            </NavbarList>
          </Nav>
          <MobileMenu
            signOutHandler={signOutHandler}
            show={expandMobileMenu}
            systemItems={systemItems}
            setExpandMobileMenu={setExpandMobileMenu}
          />
        </>
      )}
    </Container>
  );
};

interface MobileMenuInterface {
  show: boolean;
  systemItems: any;
  setExpandMobileMenu: (show: boolean) => void;
  signOutHandler: (event: React.MouseEvent) => void;
}

const MobileMenu: React.FC<MobileMenuInterface> = ({
  show,
  systemItems,
  setExpandMobileMenu,
  signOutHandler,
}: MobileMenuInterface) => {
  return (
    <MobileMenuContainer show={show}>
      <CloseButton onClick={() => setExpandMobileMenu(false)}>
        {icons.close}
      </CloseButton>
      <AllLinks>
        {systemItems
          .filter((item: any) => item.navbar)
          .map((item: RouteProps) => (
            <NavItem key={item.path} onClick={() => setExpandMobileMenu(false)}>
              <Item item={item} />
            </NavItem>
          ))}

        <NavItem>
          <NavLink to="/" onClick={signOutHandler} hasIcon activeClassName="">
            {icons.exit}
            <RouteText>Sair</RouteText>
          </NavLink>
        </NavItem>
      </AllLinks>
    </MobileMenuContainer>
  );
};

interface Item {
  item: RouteProps;
}

const Item: React.FC<Item> = ({ item }: Item) => {
  return (
    <ItemContainer>
      <MasterItemContainer>
        <NavLink
          to={String(item.path)}
          hasIcon={Boolean(item.icon)}
          activeClassName="active"
        >
          {item.icon}
          <RouteText>{item.title}</RouteText>
        </NavLink>
      </MasterItemContainer>
    </ItemContainer>
  );
};

export default Navbar;
