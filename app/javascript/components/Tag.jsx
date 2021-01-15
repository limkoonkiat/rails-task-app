import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TasksTable from "./TasksTable";

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = { tag: { name: "" }, tag_tasks: [] };

    this.deleteTag = this.deleteTag.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/tags/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tag: response.tag, tag_tasks: response.tag_tasks }))
      .catch(() => this.props.history.push("/tags"));
  }

  deleteTag() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/tags/${id}`;
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
      .then(() => this.props.history.push("/tags"))
      .catch(error => console.log(error.message));
  }

  // For TasksTable. Also exists in Tasks. 
  toggleComplete(event) {
    const target = event.target;
    const taskId = target.value;
    let task = this.state.tag_tasks.find(t => t.id == taskId);
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
      .then(() => this.props.history.push(`/tags/${this.props.match.params.id}`))
      .catch(error => console.log(error.message));
  }

  // For TasksTable. Also exists in Tasks. 
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
      .then(() => this.props.history.push(`/tags/${this.props.match.params.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    const { tag, tag_tasks } = this.state;

    return (
      <Container className="py-5">
        <h1>{"Tag: " + tag.name}</h1>

        <h5>Tagged Tasks</h5>

        {this.state.tag_tasks.length > 0
          ?
          <TasksTable
            tasks={this.state.tag_tasks}
            toggleComplete={this.toggleComplete}
            deleteTask={this.deleteTask}
          />
          :
          <Container className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>No tagged tasks yet.</h4>
          </Container>
        }

        <Row>
          <LinkContainer to={`/tags/${this.props.match.params.id}/edit`}>
            <Button variant="primary m-1">Edit Tag</Button>
          </LinkContainer>

          <Button variant="danger m-1" onClick={this.deleteTag}>Delete Tag</Button>

          <LinkContainer to={"/tags"}>
            <Button variant="secondary m-1">Back to all Tags</Button>
          </LinkContainer>
        </Row>
      </Container>
    );
  }
}

export default Tag;
