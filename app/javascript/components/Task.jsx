import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { task: { name: "", description: "", date: "", completed: false, tag_ids: [] }, tags: [] };

    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/tasks/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ task: response.task, tags: response.task_tags }))
      .catch(() => this.props.history.push("/tasks"));
  }

  deleteTask() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
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
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { task, tags } = this.state;

    return (
      <Container className="py-5">
        <h1>{"Task: " + task.name}</h1>

        <Row>
          <h5 className="mb-2">Description</h5>
          {task.description.length != 0 ? task.description : "No description available."}
        </Row>
        <Row>
          <h5 className="mb-2">Date</h5>
          {new Date(task.date).toLocaleString().split(",")[0]}
        </Row>
        <Row>
          <h5 className="mb-2">Status</h5>
          {task.completed ? "Completed" : "Incomplete"}
        </Row>
        <Row>
          <h5 className="mb-2">Tags</h5>
          {(tags.length != 0)
            ? tags.map(tag => (
              <div key={tag.id}>
                <LinkContainer to={`/tags/${tag.id}`}>
                  <Button variant="info m-1">{tag.name}</Button>
                </LinkContainer>
              </div>
            ))
            : "This task has no tags."
          }
        </Row>

        <Row>
          <LinkContainer to={`/tasks/${this.props.match.params.id}/edit`}>
            <Button variant="primary m-1">Edit Task</Button>
          </LinkContainer>

          <Button variant="danger m-1" onClick={this.deleteTask}>Delete Task</Button>

          <LinkContainer to={"/tasks"}>
            <Button variant="secondary m-1">Back to all Tasks</Button>
          </LinkContainer>
        </Row>

      </Container>
    );
  }
}

export default Task;
