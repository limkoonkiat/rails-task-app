import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './UserLogout';
import SearchBar from './SearchBar';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      currentUser: ""
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
      .then(response => this.setState({ logged_in: response.logged_in, currentUser: response.user }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to={"/"}>
          <Navbar.Brand>Task App</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {this.state.logged_in
            ?
            <>
              <Nav className="mr-auto">
                <LinkContainer to={"/tasks"}>
                  <Nav.Link>Tasks</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/tasks/new"}>
                  <Nav.Link>Add Task</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/tags"}>
                  <Nav.Link>Tags</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/tags/new"}>
                  <Nav.Link>Add Tag</Nav.Link>
                </LinkContainer>
                <Logout />
              </Nav>
              <SearchBar />
            </>
            :
            <Nav className="mr-auto">
              <LinkContainer to={"/users/sign_up"}>
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/users/sign_in"}>
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
