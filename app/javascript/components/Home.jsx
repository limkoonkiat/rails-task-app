import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from 'react-bootstrap/Jumbotron';
import LoadingSpinner from './LoadingSpinner';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged_in: false,
      currentUser: "",
      isLoaded: false
    };
  }

  componentDidMount() {
    const url = '/api/v1/logged_in';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ logged_in: response.logged_in, currentUser: response.user, isLoaded: true }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <Container className="vw-100 vh-100 d-flex align-items-center justify-content-center">
          <Jumbotron fluid className="bg-white">
            <Container>
              <h1 className="display-3">Welcome!</h1>
              <p className="lead">
                {this.state.logged_in ? "View your tasks and tags" : "Sign up or log in to get started"}
              </p>
              <hr className="my-4" />

              {this.state.logged_in
                ?
                <>
                  <LinkContainer to="/tasks">
                    <Button variant="dark m-1" size="lg">View Tasks</Button>
                  </LinkContainer>
                  <LinkContainer to="/tags">
                    <Button variant="dark m-1" size="lg">View Tags</Button>
                  </LinkContainer>
                </>
                :
                <>
                  <LinkContainer to="/users/sign_up">
                    <Button variant="dark m-1" size="lg">Sign Up</Button>
                  </LinkContainer>
                  <LinkContainer to="/users/sign_in">
                    <Button variant="dark m-1" size="lg">Log In</Button>
                  </LinkContainer>
                </>
              }
            </Container>
          </Jumbotron>
        </Container>
      );
    } else {
      return (
        <LoadingSpinner />
      );
    }
  }
}

export default Home;
