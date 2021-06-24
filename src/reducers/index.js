import { combineReducers } from "redux";
import getRecordsReducer from "./getRecordsReducer";
import getTokenReducer from "./getTokenReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  auth: loginReducer,
  authToken: getTokenReducer,
  ebayRecords: getRecordsReducer,
});
