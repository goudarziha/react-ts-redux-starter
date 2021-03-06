import { combineReducers } from "redux";
import * as authDuck from "../ducks/authDuck";
import * as userDuck from "../ducks/userDuck";
import * as messageDuck from "../ducks/messageDuck";

export interface State {
  [authDuck.NAMESPACE]: authDuck.Slice;
  [userDuck.NAMESPACE]: userDuck.Slice;
  [messageDuck.NAMESPACE]: messageDuck.Slice;
}

export const rootReducer = combineReducers({
  [authDuck.NAMESPACE]: authDuck.reducer,
  [userDuck.NAMESPACE]: userDuck.reducer,
  [messageDuck.NAMESPACE]: messageDuck.reducer
});
