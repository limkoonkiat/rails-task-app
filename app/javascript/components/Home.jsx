import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from 'react-bootstrap/Jumbotron';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <NavBar 
        history={this.props.history}
        />
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
          <Jumbotron fluid className="bg-white">
            <Container>
              <h1 className="display-4">Welcome!</h1>
              <p className="lead">
              Task tracker.
              </p>
              <hr className="my-4" />
              <LinkContainer to="/tasks">
                <Button variant="dark m-1" size="lg">View Tasks</Button>
              </LinkContainer>
              <LinkContainer to="/tags">
                <Button variant="dark m-1" size="lg">View Tags</Button>
              </LinkContainer>
            </Container>
          </Jumbotron>
        </div>
      </>
    )
  }
}

export default Home;
