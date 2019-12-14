import { combineReducers } from "redux";
import { expenseReducer } from "./expenseDuck";
import authReducer from "./authDuck";

export const rootReducer = combineReducers({
  expenses: expenseReducer,
  auth: authReducer
});
