import React, {Component} from "react";
import { Link } from "react-router-dom";
import TaskForm from "./TaskForm";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      date: new Date(Date.now()).toISOString().slice(0,10),
      completed: false,
      tags: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/tasks/${this.props.match.params.id}`;
    const { name, description, date, completed, tags } = this.state;

    if (name.length == 0)
      return;

    const body = {
        task: {
            name,
            description,
            date, 
            completed,
            tags
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
      .then(response => this.props.history.push(`/tasks/${response.id}`))
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    const url = `/api/v1/tasks/${this.props.match.params.id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ ...response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  render() {
    return (
      <TaskForm 
      onSubmit={this.onSubmit} 
      onChange={this.onChange} 
      task={this.state} 
      form_title="Edit Task"
      submit_button_label="Update Task"
      cancel_action={`/tasks/${this.props.match.params.id}`}
      cancel_button_label="Back to Task"
      />
    );
  }
}

export default EditTask;
