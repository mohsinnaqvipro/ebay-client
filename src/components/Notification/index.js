import React from "react";
// reactstrap components
import { Button, Modal, Row, Col } from "reactstrap";

class Notification extends React.Component {
  state = {
    defaultModal: false,
  };
  toggleModal = (state) => {
    this.props.hideModal();
  };
  render() {
    return (
      <>
        <Row>
          <Col md="4">
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-info"
              isOpen={this.props.show}
              toggle={() => this.toggleModal()}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Your attention is required
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal()}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">{this.props.Message}</h4>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Notification;
