import { combineReducers } from "redux";
import { expenseReducer } from "./expenseDuck";
import * as authDuck from '../ducks/authDuck';
import * as userDuck from '../ducks/userDuck';

export interface State {
  [authDuck.NAMESPACE]: authDuck.Slice,
  [userDuck.NAMESPACE]: userDuck.Slice
}

export const rootReducer = combineReducers({
  expenses: expenseReducer,
  [authDuck.NAMESPACE]: authDuck.reducer,
  [userDuck.NAMESPACE]: userDuck.reducer
});
