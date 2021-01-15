import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export default function TagForm(props) {
  return (
    <Container className="mt-5">
      <Col sm={12} lg={{ span: 6, offset: 3 }}>

        <h1 className="font-weight-normal mb-5">
          {props.form_title}
        </h1>

        <Form onSubmit={props.onSubmit}>

          <Form.Group controlId="tagName">
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
