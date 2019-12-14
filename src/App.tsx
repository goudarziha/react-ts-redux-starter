import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Register } from "./auth";
import { Header, Footer } from "./components";
import "bootstrap/dist/css/bootstrap.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
