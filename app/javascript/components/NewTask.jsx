import React, {Component} from "react";
import { Link } from "react-router-dom";

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
    this.setState({ [event.target.name]: event.target.value });

  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tasks/create";
    const { name, description, date, completed, tags } = this.state;

    if (name.length == 0)
      return;

    const body = {
      name,
      description,
      date, 
      completed,
      tags
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new task
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="taskName">Name</label>
                <input
                  type="string"
                  name="name"
                  id="TaskName"
                  className="form-control"
                  value={this.state.name}
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskDescription">Description</label>
                <textarea
                  className="form-control"
                  id="taskDescription"
                  name="description"
                  rows="4"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskDate">Date</label>
                  <input 
                  type="date" 
                  id="taskDate"
                  className="form-control"
                  required
                  value={this.state.date}
                  onChange={this.onChange}
                  />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="completed"
                  id="taskCompleted"
                  className="form-check-input"
                  value={this.state.completed}
                  onChange={this.onChange}
                />
                <label className="form_check_label" htmlFor="taskCompleted">Completed</label>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Task
              </button>
              <Link to="/tasks" className="btn btn-link mt-3">
                Back to tasks
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewTask;
