/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Animation from "../Animation/index";
import { CSVLink } from "react-csv";
import { getRecords, dispatchOrder } from "../../actions/ebayActions";
import uuid from "react-uuid";
import FilterResults from "react-filter-search";
import Notification from "../Notification";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  FormGroup,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

class ListRecords extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      pageSize: 25,
      value: "",
      loading: false,
      showDispatchedMessage: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { records, orderdispatched } = this.props;

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
    if (orderdispatched) {
      if (prevProps.orderdispatched !== orderdispatched) {
        this.setState({
          showDispatchedMessage: true,
          loading: false,
        });
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

    const { pageSize } = this.state;

    this.setState({
      loading: true,
    });

    const token = localStorage.getItem("Token");
    this.props.getRecords({
      limit: pageSize,
      token,
    });
  };

  handleDispatch = (data) => {
    this.setState({
      loading: true,
    });
    const token = localStorage.getItem("Token");

    let obj = {
      orderId: data.orderId,
      lineItemId: data.lineItems[0].lineItemId,
      quantity: 1,
      shippedDate:
        data.lineItems[0].lineItemFulfillmentInstructions
          .maxEstimatedDeliveryDate,
      shippingCarrierCode:
        data.fulfillmentStartInstructions[0].shippingStep.shippingCarrierCode,
      trackingNumber: uuid(),
      token: token,
    };

    this.props.dispatchOrder(obj);
  };

  renderDispatchButton(data) {
    return (
      <Button
        className="float-right"
        size="sm"
        color="success"
        type="button"
        onClick={() => {
          this.handleDispatch(data);
        }}
      >
        <span className="btn-inner--text">Dispatch</span>
      </Button>
    );
  }

  isDispatched = () => {
    const { showDispatchedMessage } = this.state;

    this.setState({
      showDispatchedMessage: !showDispatchedMessage,
    });
  };

  renderDispatchMessage(show) {
    return (
      <Notification
        show={show}
        hideModal={this.isDispatched}
        Message="Order Dispatched Succesfully"
        color="bg-gradient-success"
      />
    );
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  goBack = (e) => {
    window.history.back();
  };

  render() {
    const { rows, showDispatchedMessage } = this.state;

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
          <Container fluid>
            <div className="col-6">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-1">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Filter Records"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </FormGroup>
            </div>
            <div className="header-body">
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
                  <CSVLink data={rows}>Generate CSV</CSVLink>
                </CardHeader>
                <div>
                  <FilterResults
                    value={this.state.value}
                    data={rows}
                    renderResults={(rows) => (
                      <div>
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Order Id</th>
                              <th scope="col">Buyer Name</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Total Price</th>
                              <th scope="col">Currency</th>
                              <th scope="col">Payment Status</th>
                              <th scope="col">Creation Date</th>
                              <th scope="col">Dispatch</th>
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
                                <td>
                                  <div className="d-flex align-items-center">
                                    {this.renderDispatchButton(row)}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        {/* {data.map((el) => (
                          <div>
                            <span>{el.name}</span>
                            <span>{el.password}</span>
                            <span>{el.age}</span>
                          </div>
                        ))} */}
                      </div>
                    )}
                  />
                </div>
              </Card>
            </div>
          </Row>
          {showDispatchedMessage
            ? this.renderDispatchMessage(showDispatchedMessage)
            : null}
        </Container>
      </>
    );
  }
}

ListRecords.propTypes = {};

const mapStateToProps = (state) => ({
  token: state.authToken.token,
  records: state.ebayRecords.records,
  orderdispatched: state.dispatchOrder.dispatch,
});

export default connect(mapStateToProps, { getRecords, dispatchOrder })(
  withRouter(ListRecords)
);
