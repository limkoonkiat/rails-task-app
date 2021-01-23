import React, { Component } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import TasksTable from "./TasksTable";
import LoadingSpinner from './LoadingSpinner';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    const url = '/api/v1/tasks';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response, isLoaded: true }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <Container className="py-5">
          <h1 className="display-4">Tasks</h1>

          <Container className="text-right mb-3">
            <LinkContainer to="/tasks/new">
              <Button variant="dark mt-3">Add New Task</Button>
            </LinkContainer>
          </Container>

          {this.state.tasks.length > 0
            ?
            <TasksTable
              tasks={this.state.tasks}
              history={this.props.history}
              page_path={`/tasks`}
            />
            :
            <Container className="vw-100 vh-50 d-flex align-items-center justify-content-center">
              <h4>No tasks yet.</h4>
            </Container>
          }

          <LinkContainer to={`/`}>
            <Button variant="primary m-1">Home</Button>
          </LinkContainer>
          <LinkContainer to={`/tags`}>
            <Button variant="secondary m-1">To All Tags</Button>
          </LinkContainer>
        </Container>
      );
    } else {
      return (
        <LoadingSpinner />
      );
    }

  }
}

export default Tasks;
