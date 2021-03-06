import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Animation from "../Animation/index";
import { loginUser } from "../../actions/ebayActions";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
} from "reactstrap";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { response, errors } = this.props;
    if (errors) {
      if (prevProps.errors !== errors) {
        this.setState({
          loading: false,
        });
      }
    }
    if (response) {
      if (prevProps.response !== response) {
        this.setState({
          loading: false,
        });
        this.props.history.push("/admin/login/Ebay");
      }
    }
  }

  handleInputs(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;
    this.setState({
      loading: true,
    });
    this.props.loginUser({
      username: userName,
      password: password,
    });
  };

  render() {
    const { errors } = this.props;
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
          <span className="mask bg-gradient-default opacity-8" />
          <Col lg="4" />
          <Col lg="4" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Sign in with credentials</small>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="userName"
                        placeholder="User Name"
                        type="text"
                        value={this.state.userName}
                        onChange={(e) => {
                          this.handleInputs(e);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(e) => {
                          this.handleInputs(e);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  {this.state.loading ? (
                    <div>
                      <Animation size="80" />
                    </div>
                  ) : (
                    <span> </span>
                  )}
                  {errors.errorMessage ? (
                    <Alert color="danger">
                      <strong>Error!</strong> {errors.errorMessage}
                    </Alert>
                  ) : null}
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={this.handleLogin}
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.auth.userData,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
