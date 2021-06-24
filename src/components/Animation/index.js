import React from "react";
import { RotateSpinner } from "react-spinners-kit";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {}

  render() {
    const { loading } = this.state;

    return (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <LoadingOverlay
          active={loading}
          spinner={
            <RotateSpinner
              size={this.props.size}
              color="#aeb0fc"
              loading={loading}
            />
          }
        ></LoadingOverlay>
      </div>
    );
  }
}

Animation.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Animation;
