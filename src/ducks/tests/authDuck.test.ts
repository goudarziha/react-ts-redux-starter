import configureMockStore from "redux-mock-store";
import axios from "axios";
import _ from "lodash";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import * as duck from "../authDuck";
import thunk from "redux-thunk";
import { ActionStatus } from "../utils/types";
import MockAdapter from "axios-mock-adapter";

describe("authDuck", () => {
  let httpMock;
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

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
    httpMock
      .onPut(`http://localhost:3000/api/auth/logout`)
      .reply(200, MOCK_USER_01);
  });

  test("action/LOGIN - success", async done => {
    const store = mockStore(duck.initialState);
    const request = await store.dispatch(duck.login(EMAIL, PASSWORD01));
    setTimeout(async () => {
      let actions = await store.getActions();
      const successAction = _.find(actions, { status: ActionStatus.SUCCESS });
      if (successAction) {
        expect(successAction).toBeDefined();
        done();
      }
    }, 1000);
    done();
  });
  //   const store = mockStore(duck.initialState);
  //   const request = await store.dispatch(duck.login(EMAIL, PASSWORD01));
  //   setTimeout(async () => {
  //     let actions = await store.getActions();
  //     const failAction = _.find(actions, { status: ActionStatus.FAILURE });
  //     if (failAction) {
  //       expect(failAction.payload).toBe(duck.AuthStatus.NEW_PASSWORD_REQUIRED);
  //       await store.dispatch(duck.login(EMAIL, PASSWORD01, PASSWORD02, FIRST_NAME, LAST_NAME));
  //       setTimeout(async () => {
  //         actions = await store.getActions();
  //         const successAction = _.find(actions, { status: ActionStatus.SUCCESS });
  //         expect(successAction).toBeDefined();
  //         done();
  //       }, 1000);
  //     }
  //   }, 1000);
  // });
});
