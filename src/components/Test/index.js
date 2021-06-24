import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// core components
import { getToken } from "../../actions/ebayActions";

class Test extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("code");
    this.props.getToken({ code: myParam });
  }

  componentDidUpdate(prevProps) {
    const { token } = this.props;

    if (token) {
      if (prevProps.token !== token) {
        console.log("token", token);
        this.props.history.push("/auth/dashboard");
      }
    }
  }

  render() {
    return (
      <>
        <h1>Wait...</h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authToken.token,
});

export default connect(mapStateToProps, { getToken })(withRouter(Test));
