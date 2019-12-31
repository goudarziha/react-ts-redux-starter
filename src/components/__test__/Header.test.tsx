import * as React from "react";
import { render } from "@testing-library/react";
import { Header } from "..";
import { Provider } from "react-redux";
import { createStore } from "redux";
import authDuck from "../../ducks/authDuck";
import { HashRouter as Router } from "react-router-dom";

const store = createStore(authDuck, {
  status: {},
  isAuthenticated: true,
  access_token: "access_token",
  refresh_token: "refresh_token",
  user: {}
});

test("header guest", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
  const headerEl = getByTestId("header-test");
  expect(headerEl).toBeDefined();
  const guestEl = getByTestId("guest-header");
  expect(guestEl).toBeVisible();
});
