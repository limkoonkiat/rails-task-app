import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function TasksTable(props) {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Date</th>
          <th>Status</th>
          <th>Tags</th>
          <th colSpan="2"></th>
        </tr>
      </thead>

      <tbody>
        {props.tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.date.toLocaleString()}</td>
            <td>{task.completed ? "Completed" : "Incomplete"}</td>
            <td>
              {
                task.tags.length != 0
                  ? task.tags.map(tag => (
                    // Link/LinkContainer to other tags does not seem to work if the front part of the route is the same. 
                    // E.g. clicking on tag 15 in the task table while in "/tags/14" will not load "/tags/15". 
                    // Had to use window.location.href to manually load the new tag page.
                    <LinkContainer to={`/tags/${tag.id}`} key={tag.id} onClick={() => { window.location.href = ("/tags/" + tag.id) }}>
                      <Button variant="info m-1" >{tag.name}</Button>
                    </LinkContainer>
                  ))
                  : ""
              }
            </td>
            <td>
              {
                task.completed
                  ? <Button variant="warning m-1" onClick={props.toggleComplete} value={task.id}>Mark as Incomplete</Button>
                  : <Button variant="success m-1" onClick={props.toggleComplete} value={task.id}>Mark as Completed</Button>
              }
            </td>
            <td>
              <LinkContainer to={`/tasks/${task.id}`}>
                <Button variant="dark m-1">View</Button>
              </LinkContainer>

              <LinkContainer to={`/tasks/${task.id}/edit`}>
                <Button variant="primary m-1">Edit</Button>
              </LinkContainer>

              <Button variant="danger m-1" onClick={props.deleteTask} value={task.id}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
