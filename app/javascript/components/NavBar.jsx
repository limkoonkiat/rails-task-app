import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // For search results if users press enter
  onEnter(event) {
    if (event.key === 'Enter') {
      this.props.history.push(`/search?query=${this.state.query}`);
    }
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" onKeyDown={this.onEnter}>
        <LinkContainer to={"/"}>
          <Navbar.Brand>Task App</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
          </Nav>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search Tasks"
              className="mr-sm-2"
              name="query"
              required
              value={this.state.query}
              onChange={this.onChange}
            />

            {/* NOTE: Everything after the ? in the url is called "query string parameters" i.e. query=${this.state.query} here.
            It is automatically available in the params hash in the controller thus we can just link like that with the query data passed on.
            See part 4 parameters at https://guides.rubyonrails.org/action_controller_overview.html#http-basic-authentication */}
            <LinkContainer to={`/search?query=${this.state.query}`} >
              <Button variant="info">Search</Button>
            </LinkContainer>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default NavBar;
