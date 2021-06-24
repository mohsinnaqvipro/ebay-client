import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginEbay } from "../../actions/ebayActions";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
// core components

class LoginWithEbay extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
    };
    this.anchorRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { response } = this.props;

    if (response) {
      if (prevProps.response !== response) {
        window.location.href = response.data;
        this.setState({ disabled: false });
      }
    }
  }

  handleLogin = () => {
    this.setState({ disabled: true });
    this.props.LoginEbay();
  };
  render() {
    const { disabled } = this.state;
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "640px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="8" md="10">
                <h1 className="display-2 text-white">Hello Rohail</h1>
                <p className="text-white mt-0 mb-5">
                  Click on the Sign In With Ebay Button And Add user
                  Credentials.
                </p>
                <Button
                  color="info"
                  href="#pablo"
                  disabled={disabled}
                  onClick={(e) => {
                    this.handleLogin();
                  }}
                >
                  Sign In with Ebay
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--7" fluid></Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.auth.loginData,
});

export default connect(mapStateToProps, { LoginEbay })(
  withRouter(LoginWithEbay)
);
