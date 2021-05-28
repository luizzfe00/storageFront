import React, { useContext } from 'react';

import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Navbar from '../components/General/Navbar';
import PrivateRoute from '../components/General/PrivateRoute';
import PublicRoute from '../components/General/PublicRoute';
import { AccountContext } from '../contexts/AccountContext';
import { State } from '../redux/Login/types';
import { privateRouteList, publicRouteList, RouteProps } from './routeList';

const Routes: React.FC = () => {
  const auth: boolean = useSelector((state: State) => state.auth);

  const { data: accountInfo } = useContext(AccountContext);

  return (
    <BrowserRouter>
      {auth ? (
        <>
          <Navbar />
          <Switch>
            {privateRouteList.map((routeProps: RouteProps) => (
              <PrivateRoute
                key={`private#${routeProps.path}`}
                auth={auth}
                {...routeProps}
              />
            ))}
            <Redirect
              to={
                accountInfo?.producer?.name === null
                  ? `/myAccount`
                  : '/products'
              }
            />
          </Switch>
        </>
      ) : (
        <Switch>
          {publicRouteList.map((routeProps: RouteProps) => (
            <PublicRoute
              key={`public#${routeProps.path}`}
              auth={auth}
              {...routeProps}
            />
          ))}
          <Redirect to="/" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
