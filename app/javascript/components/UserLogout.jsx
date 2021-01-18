import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';

class UserLogout extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout(event) {
    event.preventDefault();
    const url = "/users/sign_out";

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => window.location = "/")
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <Nav.Link onClick={this.handleLogout}>Log Out</Nav.Link>
    );
  };
}

export default UserLogout;
