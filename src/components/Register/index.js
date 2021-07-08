import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Animation from "../Animation/index";
import { registerUser } from "../../actions/ebayActions";
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
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userName: "",
      password: "",
      errors: null,
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { response, errors } = this.props;
    if (errors) {
      if (prevProps.errors !== errors) {
        this.setState({
          loading: false,
          errors: errors,
        });
      }
    }
    if (response) {
      if (prevProps.response !== response) {
        this.setState({
          loading: false,
        });
        this.props.history.push("/auth/dashboard");
      }
    }
  }

  handleInputs(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  goBack = (e) => {
    window.history.back();
  };

  handleRegistration = (e) => {
    e.preventDefault();
    const { email, userName, password } = this.state;
    const userId = localStorage.getItem("id");
    this.setState({
      loading: true,
    });
    this.props.registerUser({
      id: userId,
      email: email,
      username: userName,
      password: password,
    });
  };

  render() {
    const { errors } = this.state;
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
                <span style={{ color: "grey", cursor: "pointer" }}>
                  <i
                    className="fa fa-arrow-circle-left fa-3x"
                    onClick={this.goBack}
                  />
                </span>
                <div className="text-center text-muted mb-4">
                  <small>Register New User</small>
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
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={this.state.email}
                        onChange={(e) => {
                          this.handleInputs(e);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
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
                  {errors ? (
                    <Alert color="danger">
                      <strong>Error!</strong>{" "}
                      {errors.errorMessage
                        ? errors.errorMessage
                        : errors.message}
                    </Alert>
                  ) : null}
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={this.handleRegistration}
                    >
                      Register
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
  response: state.auth.register,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
