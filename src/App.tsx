import React from "react";
import * as _ from "lodash";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Login, Register } from "./auth";
import { Main, Dashboard, Settings, Profile } from "./containers";
import { Header, Footer, PrivateRoute } from "./components";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { checkToken } from "./ducks/authDuck";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state =>
    _.get(state, ["auth", "isAuthenticated"])
  );

  React.useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkToken());
    }
  });

  return (
    <div className="App" data-testid="app-test">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
