import * as React from "react";
import * as _ from "lodash";
import { Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

interface PrivateRouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const { isAuthenticated } = useSelector(
    state => ({
      isAuthenticated: _.get(state, ["auth", "isAuthenticated"])
    }),
    shallowEqual
  );

  if (!isAuthenticated) {
    const renderComponent = () => <Redirect to="/login" />;
    return (
      <Route
        {...props}
        component={renderComponent}
        render={undefined}
        data-testid="private-route-test-noauth"
      />
    );
  } else {
    return <Route {...props} data-testid="private-route-test-auth" />;
  }
};

export default PrivateRoute;
