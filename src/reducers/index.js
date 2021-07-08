import { combineReducers } from "redux";
import dispatchReducer from "./dispatchReducer";
import getRecordsReducer from "./getRecordsReducer";
import getTokenReducer from "./getTokenReducer";
import loginReducer from "./loginReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: loginReducer,
  authToken: getTokenReducer,
  ebayRecords: getRecordsReducer,
  dispatchOrder: dispatchReducer,
  errors: errorReducer,
});
