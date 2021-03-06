import { GET_TOKEN } from "../types/types";
const initialState = {
  token: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
