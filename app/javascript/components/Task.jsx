import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';

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
      <Col sm={12} lg={{ span: 6, offset: 3 }}>
        <Container className="py-5">
          <Jumbotron fluid className="bg-light">
            <h1 className="font-weight-normal ml-4 mb-5">{"Task: " + task.name}</h1>

            <Container className="my-2 mx-10">
              <h5>Description</h5>
              {task.description.length != 0 ? task.description : "No description available."}
            </Container>

            <Container className="my-2 mx-10">
              <h5 className="mb-2">Date</h5>
              {new Date(task.date).toLocaleString().split(",")[0]}
            </Container>

            <Container className="my-2 mx-10">
              <h5 className="mb-2">Status</h5>
              {task.completed ? "Completed" : "Incomplete"}
            </Container>

            <Container className="my-2 mx-10">
              <h5 className="mb-2">Tags</h5>
              <Container className="row">
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
              </Container>
            </Container>

            <Container className="mt-5">
              <Container className="row">
                <LinkContainer to={`/tasks/${this.props.match.params.id}/edit`}>
                  <Button variant="primary m-1">Edit Task</Button>
                </LinkContainer>

                <Button variant="danger m-1" onClick={this.deleteTask}>Delete Task</Button>

                <LinkContainer to={"/tasks"}>
                  <Button variant="outline-dark m-1">Back to All Tasks</Button>
                </LinkContainer>
                <LinkContainer to={"/tags"}>
                  <Button variant="outline-dark m-1">Back to All Tags</Button>
                </LinkContainer>
              </Container>
            </Container>

          </Jumbotron>


        </Container>
      </Col>
    );
  }
}

export default Task;
