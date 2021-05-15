import React from 'react';

import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Navbar from '../components/General/Navbar';
import PrivateRoute from '../components/General/PrivateRoute';
import PublicRoute from '../components/General/PublicRoute';
import { State } from '../redux/Login/types';
import { privateRouteList, publicRouteList, RouteProps } from './routeList';

const Routes: React.FC = () => {
  const auth: boolean = useSelector((state: State) => state.auth);

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
            <Redirect to="/products" />
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
          <Redirect to="/auth" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
