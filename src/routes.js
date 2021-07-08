/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "./components/Dashboard";
import ListRecords from "./components/ListRecords";
import Login from "./components/Login";
import LoginWithEbay from "./components/LoginWithEbay";
import Register from "./components/Register";
import Test from "./components/Test";

var routes = [
  {
    path: "/auth/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/register",
    name: "Register New User",
    icon: "ni ni-key-25 text-info",
    component: Register,
    layout: "/admin",
  },
  {
    path: "/login/Ebay",
    name: "Login With Ebay",
    icon: "ni ni-key-25 text-info",
    component: LoginWithEbay,
    layout: "/admin",
  },
  {
    path: "/Test",
    name: "Login With Ebay",
    icon: "ni ni-key-25 text-info",
    component: Test,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-laptop text-green",
    component: Dashboard,
    layout: "/auth",
    isSmartLink: true,
  },
  {
    path: "/list/records",
    name: "Orders",
    icon: "ni ni-key-25 text-info",
    component: ListRecords,
    layout: "/auth",
  },
];
export default routes;
