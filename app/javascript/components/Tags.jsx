import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LoadingSpinner from './LoadingSpinner';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      isLoaded: false
    };

    this.deleteTag = this.deleteTag.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/tags";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tags: response, isLoaded: true }))
      .catch(() => this.props.history.push("/"));
  }

  deleteTag(event) {
    if (window.confirm("Delete this tag?")) {
      const target = event.target;
      const id = target.value;

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
        .then(() => this.props.history.push("/")) // Force refresh of tags page by going to the homepage first
        .then(() => this.props.history.push("/tags"))
        .catch(error => console.log(error.message));
    }
  }

  render() {
    const { tags } = this.state;
    const allTags = tags.map((tag, index) => (
      <Col md={6} lg={4} key={index}>
        <Container className="card mb-4">
          <Container className="card-body">
            <h5 className="card-title">{tag.name}</h5>

            <LinkContainer to={`/tags/${tag.id}`}>
              <Button variant="dark m-1">View Tasks</Button>
            </LinkContainer>

            <LinkContainer to={`/tags/${tag.id}/edit`}>
              <Button variant="primary m-1">Edit</Button>
            </LinkContainer>

            <Button variant="danger m-1" onClick={this.deleteTag} value={tag.id}>Delete</Button>
          </Container>
        </Container>
      </Col>
    ));

    const noTag = (
      <Container className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>No tags yet.</h4>
      </Container>
    );

    if (this.state.isLoaded) {
      return (
        <Container className="py-5">
          <h1 className="display-4">Tags</h1>

          <Container className="text-right mb-3">
            <LinkContainer to={"/tags/new"}>
              <Button variant="dark mt-3">Add New Tag</Button>
            </LinkContainer>
          </Container>

          <Row>
            {tags.length > 0 ? allTags : noTag}
          </Row>

          <LinkContainer to={"/"}>
            <Button variant="primary m-1">Home</Button>
          </LinkContainer>
          <LinkContainer to={`/tasks`}>
            <Button variant="secondary m-1">To All Tasks</Button>
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

export default Tags;
