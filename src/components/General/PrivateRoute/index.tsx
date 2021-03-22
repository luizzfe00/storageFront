import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from '../../../routes/routeList';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  path,
  exact,
  auth = false,
  ...rest
}: RouteProps) => {
  const isLogged: boolean = auth;

  return (
    <React.Fragment key={`private ${path}`}>
      <Route
        path={path}
        exact={exact}
        {...rest}
        render={(props) =>
          isLogged ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      />
    </React.Fragment>
  );
};

export default PrivateRoute;
