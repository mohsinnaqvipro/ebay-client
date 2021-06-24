import { LOGIN_REDUCER } from "../types/types";
const initialState = {
  loginData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REDUCER:
      return {
        ...state,
        loginData: action.payload,
      };
    default:
      return state;
  }
}
