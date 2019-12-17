import React from "react";
import * as _ from 'lodash';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Login, Register } from "./auth";
import { Dashboard } from './pages';
import { Header, Footer } from "./components";
import { useSelector } from 'react-redux'
import "bootstrap/dist/css/bootstrap.css";

const App: React.FC = () => {
  const isAuthenticated = useSelector(state => _.get(state, ['auth', 'isAuthenticated']))


  return (
    <div className="App" data-testid="app-test">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" compoonent={Dashboard} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
