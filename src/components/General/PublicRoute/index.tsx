import React from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from '../../../routes/routeList';

const PublicRoute: React.FC<RouteProps> = ({
  component: Component,
  path,
  exact,
  auth = false,
  ...rest
}: RouteProps) => {
  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
};

export default PublicRoute;
