import React, { Component } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import TasksTable from "./TasksTable";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    const url = window.location.href.replace("search", "/api/v1/search"); // Get api location from url location
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ results: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    return (
      <Container className="py-5">
        <h1 className="display-4">Search Results</h1>

        {this.state.results.length > 0

          ?
          <TasksTable
            tasks={this.state.results}
            history={this.props.history}
            page_path={"/search" + window.location.href.split("/search")[1]} // Get the url from /search onwards
          />
          :
          <Container className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>No tasks found.</h4>
          </Container>
        }

        <LinkContainer to={`/`}>
          <Button variant="primary">Home</Button>
        </LinkContainer>
      </Container>
    );
  }
}

export default Search;
