import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export default function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
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
          <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="info">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
