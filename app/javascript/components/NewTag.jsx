import React, { Component } from "react";
import TagForm from "./TagForm";

class NewTag extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tags";
    const { name } = this.state;

    if (name.length == 0)
      return;

    const body = {
      tag: {
        name
      }
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
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
      .then(response => this.props.history.push(`/tags/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <TagForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        data={this.state}
        form_title="Add a New Tag"
        submit_button_label="Create Tag"
        cancel_path="/tags"
        cancel_button_label="Back to All Tags"
      />
    );
  }
}

export default NewTag;
