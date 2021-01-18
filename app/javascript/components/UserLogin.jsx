import React, { Component } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const url = "/users/sign_in";
    const { email, password } = this.state;

    const body = {
      user: {
        email,
        password
      }
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 422) {
          this.setState({message: "The email or password does not match. Please try again."})
        } else {
          this.setState({message: "There are some problems with logging in. Please try again."})
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => window.location = '/')
      .catch(error => console.log(error.message));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Container className="my-5">
        <Col sm={12} lg={{ span: 6, offset: 3 }}>

          <h1 className="font-weight-normal mb-5">
            Log In
          </h1>

          <Form onSubmit={this.handleLogin}>

            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                required
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.onChange}
              />
            </Form.Group>
            

            <small className="text-danger">{this.state.message}</small>

            <Row>
              <LinkContainer to={'/users/sign_up'}>
                <Button variant="link m-1">
                  Don't have an account? Sign up!
                </Button>
              </LinkContainer>
            </Row>

            <Button type="submit" variant="dark m-1">
              Login
            </Button>
            
            <LinkContainer to={'/'}>
              <Button variant="light m-1">
                Back
              </Button>
            </LinkContainer>

          </Form>
        </Col>
      </Container>
    );
  }
}

export default UserLogin;
