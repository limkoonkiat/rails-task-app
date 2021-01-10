import React, {Component} from "react";
import { Link } from "react-router-dom";
import TagForm from "./TagForm";

class EditTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/tags/${this.props.match.params.id}`;
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
      .then(response => this.props.history.push(`/tags/${response.id}`))
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    const url = `/api/v1/tags/${this.props.match.params.id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ ...response }))
      .catch(() => this.props.history.push("/tags"));
  }

  render() {
    return (
      <TagForm 
      onSubmit={this.onSubmit} 
      onChange={this.onChange} 
      tag={this.state} 
      form_title="Edit Tag"
      submit_button_label="Update Tag"
      cancel_action={`/tags/${this.props.match.params.id}`}
      cancel_button_label="Back to Tag"
      />
    );
  }
}

export default EditTag;
