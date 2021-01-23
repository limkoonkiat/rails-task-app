import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="vw-100 vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }
}

export default LoadingSpinner;
