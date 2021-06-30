import axios from "axios";
import {
  LOGIN_REDUCER,
  GET_ERRORS,
  GET_TOKEN,
  GET_RECORDS,
  DISPATCH_ORDER,
} from "../types/types";
import NetworkInfo from "../network-info";

export const LoginEbay = () => (dispatch) => {
  console.log("Login With Ebay: ====");
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
