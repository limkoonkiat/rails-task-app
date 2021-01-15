import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
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
      .then(response => this.setState({ tags: response }))
      .catch(() => this.props.history.push("/"));
  }

  deleteTag(event) {
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

  render() {
    const { tags } = this.state;
    const allTags = tags.map((tag, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{tag.name}</h5>

            <LinkContainer to={`/tags/${tag.id}`}>
              <Button variant="dark m-1">View</Button>
            </LinkContainer>

            <LinkContainer to={`/tags/${tag.id}/edit`}>
              <Button variant="primary m-1">Edit</Button>
            </LinkContainer>

            <Button variant="danger m-1" onClick={this.deleteTag} value={tag.id}>Delete</Button>
          </div>
        </div>
      </div>
    ));

    const noTag = (
      <Container className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>No tags yet.</h4>
      </Container>
    );

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
          <Button variant="primary mt-3">Home</Button>
        </LinkContainer>
      </Container>
    );
  }
}

export default Tags;
