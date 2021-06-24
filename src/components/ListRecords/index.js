/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import ReactDatetime from "react-datetime";
import Animation from "../Animation/index";
import { getRecords } from "../../actions/ebayActions";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input,
  CardFooter,
} from "reactstrap";

class ListRecords extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedCreationDate: "",
      rows: [],
      pageSize: 25,
      loading: false,
    };
  }

  componentDidMount() {
    const { pageSize } = this.state;
    const token = localStorage.getItem("Token");
    this.setState({ loading: true });
    this.props.getRecords({ limit: pageSize, token });
  }

  componentDidUpdate(prevProps) {
    const { records } = this.props;
    if (records.status === true) {
      if (prevProps.records !== records) {
        this.setState({ rows: records.data.orders, loading: false });
      }
    }
    if (records.status === false) {
      if (prevProps.records !== records) {
        this.setState({ rows: records.data, loading: false });
      }
    }
  }

  handleSize = (size) => {
    const { searchedCreationDate } = this.state;
    this.setState({
      pageSize: size,
      loading: true,
    });
    const token = localStorage.getItem("Token");
    this.props.getRecords({
      limit: size,
      date: searchedCreationDate,
      token,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();

    const { searchedCreationDate, pageSize } = this.state;

    this.setState({
      loading: true,
    });

    const token = localStorage.getItem("Token");
    this.props.getRecords({
      limit: pageSize,
      date: searchedCreationDate,
      token,
    });
  };

  handleCreationDate = (date) => {
    let selectDate = moment(date).format("YYYY-MM-DD");
    if (selectDate === "Invalid date") {
      selectDate = "";
    }
    this.setState({ searchedCreationDate: selectDate });
  };

  goBack = (e) => {
    window.history.back();
  };

  render() {
    const { rows } = this.state;
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
          <Container fluid>
            <div className="header-body">
              <Row>
                <div className="col-6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Creation Date",
                        }}
                        timeFormat={false}
                        value={this.state.searchedCreationDate}
                        onChange={this.handleCreationDate}
                        locale="en-US"
                        closeOnSelect
                      />
                    </InputGroup>
                  </FormGroup>
                </div>
              </Row>
              <Row>
                <div className="col">
                  <Button
                    className="float-right"
                    color="primary"
                    type="button"
                    onClick={(e) => {
                      this.handleSearch(e);
                    }}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-search" />
                    </span>
                    <span className="btn-inner--text">Search</span>
                  </Button>
                </div>
              </Row>
              <span style={{ color: "white", cursor: "pointer" }}>
                <i
                  className="fa fa-arrow-circle-left fa-3x"
                  onClick={this.goBack}
                />
              </span>
            </div>
          </Container>
        </div>
        {this.state.loading ? (
          <div>
            <Animation size="80" />
          </div>
        ) : (
          <span> </span>
        )}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <div className="float-right">
                    <FormGroup>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        style={{
                          width: "100px",
                          height: "40px",
                          marginLeft: "10px",
                        }}
                        onChange={(e) => this.handleSize(e.target.value)}
                      >
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                      </Input>
                    </FormGroup>
                  </div>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Order Id</th>
                      <th scope="col">Buyer Name</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Creation Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            {row.orderId}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {row.buyer.username}
                          </div>
                        </td>
                        {row.lineItems.map((item) => (
                          <td>
                            <div
                              style={{ whiteSpace: "normal" }}
                              className="d-flex align-items-center"
                            >
                              {item.title}
                            </div>
                          </td>
                        ))}
                        <td>
                          <div className="d-flex align-items-center">
                            {row.pricingSummary.total.value}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {row.pricingSummary.total.currency}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {row.orderPaymentStatus}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {row.creationDate}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

ListRecords.propTypes = {};

const mapStateToProps = (state) => ({
  token: state.authToken.token,
  records: state.ebayRecords.records,
});

export default connect(mapStateToProps, { getRecords })(
  withRouter(ListRecords)
);
