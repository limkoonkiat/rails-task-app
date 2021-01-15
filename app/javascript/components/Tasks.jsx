import React, { Component } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import TasksTable from "./TasksTable";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };

    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/"));
  }

  // For TasksTable. Also exists in Tag. 
  toggleComplete(event) {
    const target = event.target;
    const taskId = target.value;
    let task = this.state.tasks.find(t => t.id == taskId);
    task.completed = !task.completed;

    event.preventDefault();
    const url = `/api/v1/tasks/${taskId}`;

    const body = {
      task
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push(`/tasks`))
      .catch(error => console.log(error.message));
  }

  // For TasksTable. Also exists in Tag. 
  deleteTask(event) {
    const target = event.target;
    const id = target.value;

    const url = `/api/v1/tasks/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/")) // Force refresh of tasks page by going to the homepage first
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  render() {
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
            toggleComplete={this.toggleComplete}
            deleteTask={this.deleteTask}
          />
          :
          <Container className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>No tasks yet.</h4>
          </Container>
        }

        <LinkContainer to={`/`}>
          <Button variant="primary">Home</Button>
        </LinkContainer>
      </Container>
    );
  }
}

export default Tasks;
