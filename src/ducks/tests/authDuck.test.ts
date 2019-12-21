import * as React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";

describe("authDuck", () => {
  let mock;
  let mockStore: (state: any) => any;

  const EMAIL = "test@test.com";
  const FIRST_NAME = "bob";
  const LAST_NAME = "Saget";
  const PASSWORD01 = "password";
  const PASSWORD02 = "password2";
  const PASSWORD03 = "password3";
  const ACCESS_TOKEN = "randomstufftoken";
  const REFRESH_TOKE = "morerandomstuffhere";

  const MOCK_USER_01 = {
    u_id: "user_uid_01",
    email: "test@test.com",
    first_name: "bob",
    last_name: "test",
    avatar: "http://avatar.com",
    bio: "test bio",
    confirmed: false,
    created: "01/01/20",
    last_edited: "01/02/20",
    username: "testname"
  };
});
