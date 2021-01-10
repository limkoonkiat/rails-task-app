import React, {Component} from "react";
import { Link } from "react-router-dom";
import TaskForm from "./TaskForm";

class NewTask extends Component {
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
    const url = "/api/v1/tasks";
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
      .then(response => this.props.history.push(`/tasks/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <TaskForm 
      onSubmit={this.onSubmit} 
      onChange={this.onChange} 
      task={this.state} 
      form_title="Add a New Task"
      submit_button_label="Create Task"
      cancel_action="/tasks" 
      cancel_button_label="Back to All Tasks"
      />
    );
  }
}

export default NewTask;
