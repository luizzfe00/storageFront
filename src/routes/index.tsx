import React from 'react';

import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../components/General/PrivateRoute';
import PublicRoute from '../components/General/PublicRoute';
import { State } from '../redux/Login/types';
import { privateRouteList, publicRouteList, RouteProps } from './routeList';

const Routes: React.FC = () => {
  const auth: boolean = useSelector((state: State) => state.auth);

  return (
    <BrowserRouter>
      {auth ? (
        <Switch>
          {privateRouteList.map((routeProps: RouteProps) => (
            <PrivateRoute
              key={`private#${routeProps.path}`}
              auth={auth}
              {...routeProps}
            />
          ))}
          <Redirect to="/" />
        </Switch>
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
