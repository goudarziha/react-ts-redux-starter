import React from "react";
import _ from "lodash";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Register, ResetPassword } from "./auth";
import { Main, Dashboard, Settings, Profile } from "./containers";
import { Header, Footer, PrivateRoute } from "./components";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { checkToken } from "./ducks/authDuck";
//@ts-ignore
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
//@ts-ignore
import { store } from "react-notifications-component";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state =>
    _.get(state, ["auth", "isAuthenticated"])
  );

  const message = useSelector(state => _.get(state, ["message", "message"]));
  const type = useSelector(state =>
    _.lowerCase(_.get(state, ["message", "type"]))
  );

  if (message) {
    store.addNotification({
      title: "Wonderful!",
      message: message,
      type: type,
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000
      }
    });
  }

  React.useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkToken());
    }
  });

  return (
    <div className="App" data-testid="app-test">
      <ReactNotification />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={ResetPassword} />
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
