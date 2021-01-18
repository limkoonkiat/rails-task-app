import React, { Component } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class TasksTable extends Component {
  constructor(props) {
    super(props);

    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  toggleTaskComplete(event) {
    const target = event.target;
    const taskId = target.value;
    let task = this.props.tasks.find(t => t.id == taskId);
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
      .then(() => this.props.history.push(this.props.page_path))
      .catch(error => console.log(error.message));
  }

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
      .then(() => this.props.history.push(this.props.page_path))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Tags</th>
            <th colSpan="1"></th>
          </tr>
        </thead>

        <tbody>
          {this.props.tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{new Date(task.date).toLocaleString().split(",")[0]}</td>
              <td>
                {
                  task.completed
                    ? <Button variant="success m-1" onClick={this.toggleTaskComplete} value={task.id}>Completed</Button>
                    : <Button variant="warning m-1" onClick={this.toggleTaskComplete} value={task.id}>Incomplete</Button>
                }
              </td>
              <td>
                {
                  task.tags.length != 0
                    ? task.tags.map(tag => (
                      // Link/LinkContainer to other tags does not seem to work if the front part of the route is the same. 
                      // E.g. clicking on tag 15 in the task table while in "/tags/14" will not load "/tags/15". 
                      // Had to use window.location to manually load the new tag page.
                      <LinkContainer to={`/tags/${tag.id}`} key={tag.id} onClick={() => { window.location = ("/tags/" + tag.id) }}>
                        <Button variant="info m-1" key={tag.id}>{tag.name}</Button>
                      </LinkContainer>
                    ))
                    : ""
                }
              </td>
              <td>
                <LinkContainer to={`/tasks/${task.id}`}>
                  <Button variant="dark m-1">View</Button>
                </LinkContainer>

                <LinkContainer to={`/tasks/${task.id}/edit`}>
                  <Button variant="primary m-1">Edit</Button>
                </LinkContainer>

                <Button variant="danger m-1" onClick={this.deleteTask} value={task.id}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TasksTable;
