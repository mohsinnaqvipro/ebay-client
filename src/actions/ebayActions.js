import axios from "axios";
import {
  LOGIN_REDUCER,
  SET_CURRENT_USER,
  REGISTER_USER,
  GET_ERRORS,
  GET_TOKEN,
  GET_RECORDS,
  DISPATCH_ORDER,
  USER_COUNT,
} from "../types/types";
import NetworkInfo from "../network-info";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../components/Validations/index";

export const loginUser = (userData) => (dispatch) => {
  let payload = validateLoginInput(userData);
  if (!payload.isValid) {
    dispatch({
      type: GET_ERRORS,
      payload: payload.errors,
    });
  } else {
    axios
      .post(NetworkInfo.loginUser, userData)
      .then((res) => {
        localStorage.setItem("id", res.data.data.id);
        dispatch({
          type: SET_CURRENT_USER,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        }
      });
  }
};

export const registerUser = (userData) => (dispatch) => {
  let payload = validateRegisterInput(userData);
  if (!payload.isValid) {
    dispatch({
      type: GET_ERRORS,
      payload: payload.errors,
    });
  } else {
    axios
      .post(NetworkInfo.registerUser, userData)
      .then((res) => {
        dispatch({
          type: REGISTER_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        }
      });
  }
};

export const getUsersCount = () => (dispatch) => {
  axios
    .get(NetworkInfo.getUsersCount)
    .then((res) => {
      dispatch({
        type: USER_COUNT,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const LoginEbay = () => (dispatch) => {
  axios
    .post(NetworkInfo.loginWithEbay)
    .then((res) => {
      dispatch({
        type: LOGIN_REDUCER,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const getToken = (code) => (dispatch) => {
  axios
    .post(NetworkInfo.getToken, code)
    .then((res) => {
      const { access_token } = res.data;
      localStorage.setItem("Token", access_token);
      dispatch({
        type: GET_TOKEN,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const getRecords = (userData) => (dispatch) => {
  axios
    .post(NetworkInfo.getRecords, userData)
    .then((res) => {
      dispatch({
        type: GET_RECORDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const dispatchOrder = (userData) => (dispatch) => {
  axios
    .post(NetworkInfo.dispatchOrder, userData)
    .then((res) => {
      dispatch({
        type: DISPATCH_ORDER,
        payload: res,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};
