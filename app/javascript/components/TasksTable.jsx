import React from "react";
import {LinkContainer} from 'react-router-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


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
            {props.data.tasks.map((task, index) => (
                <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.date.toLocaleString()}</td>
                    <td>{task.completed ? "Completed" : "Incomplete"}</td>
                    <td>
                    {   
                        task.tags.length != 0 
                        ? task.tags.map(tag => (
                            <LinkContainer to={`/tags/${tag.id}`} key={tag.id}>
                                <Button variant="info m-1">{tag.name}</Button>
                            </LinkContainer>
                            ))
                        : ""
                    }
                    </td>
                    <td>
                    {
                        task.completed
                        ?  <Button variant="warning m-1" onClick={props.toggleComplete} value={task.id}>Mark as Incomplete</Button>
                        :  <Button variant="success m-1" onClick={props.toggleComplete} value={task.id}>Mark as Completed</Button>
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
