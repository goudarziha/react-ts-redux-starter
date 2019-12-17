import { combineReducers } from "redux";
import { expenseReducer } from "./expenseDuck";
import authReducer from "./authDuck";
import userReducer from './userDuck';

export const rootReducer = combineReducers({
  expenses: expenseReducer,
  auth: authReducer,
  user: userReducer
});
