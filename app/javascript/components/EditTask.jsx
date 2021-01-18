import React, { Component } from "react";
import TaskForm from "./TaskForm";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      date: new Date(Date.now()).toISOString().slice(0, 10),
      completed: false,
      tag_ids: [],
      allTags: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleMultipleTagCheckboxes = this.handleMultipleTagCheckboxes.bind(this);
  }

  componentDidMount() {
    // For all tags
    fetch('/api/v1/tags')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ allTags: response }))
      .catch(() => this.props.history.push("/"));    

    // For task
    fetch(`/api/v1/tasks/${this.props.match.params.id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({
        name: response.task.name,
        description: response.task.description,
        date: response.task.date,
        completed: response.task.completed,
        tag_ids: response.task_tags.map(tag => tag.id)
      }))
      .catch(() => this.props.history.push("/tasks"));    
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleMultipleTagCheckboxes(event) {
    const target = event.target;
    let id = target.value;
    let newTagIds;
    if (target.checked && !this.state.tag_ids.includes(id)) {
      newTagIds = [...this.state.tag_ids, id]

    } else if (!target.checked) {
      newTagIds = this.state.tag_ids.filter(x => x != id)
    } else {
      newTagIds = this.state.tag_ids;
    }

    this.setState({
      tag_ids: newTagIds
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/tasks/${this.props.match.params.id}`;
    const { name, description, date, completed, tag_ids } = this.state;

    if (name.length == 0)
      return;

    const body = {
      task: {
        name,
        description,
        date,
        completed,
        tag_ids
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

  render() {
    return (
      <TaskForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        handleMultipleTagCheckboxes={this.handleMultipleTagCheckboxes}
        data={this.state}
        form_title="Edit Task"
        submit_button_label="Update Task"
        cancel_path={`/tasks/${this.props.match.params.id}`}
        cancel_button_label="Back to Task"
      />
    );
  }
}

export default EditTask;
