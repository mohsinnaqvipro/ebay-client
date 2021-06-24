import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Route
                path="/auth"
                render={(props) => <AuthLayout {...props} />}
              />
              <Redirect from="/" to="/admin/auth/login" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
