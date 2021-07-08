import {
  LOGIN_REDUCER,
  SET_CURRENT_USER,
  REGISTER_USER,
  USER_COUNT,
} from "../types/types";
const initialState = {
  loginData: {},
  userData: {},
  register: {},
  count: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REDUCER:
      return {
        ...state,
        loginData: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        register: action.payload,
      };
    case USER_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}
