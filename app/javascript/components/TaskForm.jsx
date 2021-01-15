import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';

export default function TaskForm(props) {
  return (
    <Container className="my-5">
      <Col sm={12} lg={{ span: 6, offset: 3 }}>

        <h1 className="font-weight-normal mb-5">
          {props.form_title}
        </h1>

        <Form onSubmit={props.onSubmit}>

          <Form.Group controlId="taskName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="string"
              placeholder="Enter name"
              required
              value={props.data.name}
              onChange={props.onChange}
            />
          </Form.Group>

          <Form.Group controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              type="text"
              placeholder="Enter description"
              rows="4"
              value={props.data.description}
              onChange={props.onChange}
            />
          </Form.Group>

          <Form.Group controlId="taskDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="date"
              required
              value={props.data.date}
              onChange={props.onChange}
            />
          </Form.Group>

          <Form.Group controlId="taskCompleted">
            <Form.Check
              name="completed"
              type="checkbox"
              label="Completed"
              checked={props.data.completed}
              onChange={props.onChange}
            />
          </Form.Group>

          <Form.Group controlId="taskTags">
            Tags
            <small> (You can select more than one)</small>
            {props.data.allTags.map(tag => {
              return <div key={tag.id} className="m-3">
                <Form.Check
                  name={"task_tag_ids_" + tag.id.toString()}
                  type="checkbox"
                  label={tag.name}
                  id={"task_tag_ids_" + tag.id.toString()}
                  defaultChecked={props.data.tag_ids.includes(tag.id)}
                  value={tag.id}
                  onChange={props.handleMultipleTagCheckboxes}
                />
              </div>
            })}
          </Form.Group>

          <Button type="submit" variant="dark m-1">
            {props.submit_button_label}
          </Button>

          <LinkContainer to={props.cancel_path}>
            <Button variant="light m-1">
              {props.cancel_button_label}
            </Button>
          </LinkContainer>

        </Form>
      </Col>
    </Container>
  );
}
