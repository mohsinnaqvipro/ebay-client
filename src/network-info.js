import axios from "axios";
export default class NetworkInfo {
  static loginWithEbay = "http://localhost:3000/users/auth/url";
  static getToken = "http://localhost:3000/users/auth/ouAtuh/token";
  static getRecords = "http://localhost:3000/users/orders";
  static dispatchOrder = "http://localhost:3000/users/order/dispatch";
  static loginUser = "http://localhost:3000/users/login";
  static registerUser = "http://localhost:3000/users/register";
  static getUsersCount = "http://localhost:3000/users/count";
  // static getAxios = (token) => {
  //   let axiosInstance = (axios.defaults.headers.common = {
  //     Authorization: token,
  //   });
  //   return axiosInstance;
  // };

  // static getRecords = (filters) => {
  //   let url = "https://api.ebay.com/sell/fulfillment/v1/order";
  //   url = url + "?limit=" + filters.limit;
  //   // if (filters.limit) {
  //   //   url = url + '&companyId=' + filters.companyId;
  //   // }
  //   return url;
  // };
}
