import { DISPATCH_ORDER } from "../types/types";
const initialState = {
  dispatch: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DISPATCH_ORDER:
      return {
        ...state,
        dispatch: action.payload,
      };
    default:
      return state;
  }
}
