import React, {Component} from "react";
import { Link } from "react-router-dom";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { task: { description: "", completed: false} };

    this.deleteTask = this.deleteTask.bind(this);
  }
  
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/tasks/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ task: response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  deleteTask() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/tasks/${id}`;
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
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { task } = this.state;
    let description = "No description available.";
    if (task.description.length != 0) {
      description = task.description
    } 

    return (
      <div className="">
          <h1>{"Task: " + task.name}</h1>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
                <h5 className="mb-2">Description</h5>
                {description}
            </div>
            <div className="col-sm-12 col-lg-3">
                <h5 className="mb-2">Date</h5>
                {new Date(task.date).toLocaleString().split(",")[0]}
            </div>
            <div className="col-sm-12 col-lg-3">
                <h5 className="mb-2">Status</h5>
                {task.completed ? "Completed" : "Incomplete"}
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                Delete Task
              </button>
            </div>
          </div>
          <Link to="/tasks" className="btn btn-link">
            Back to tasks
          </Link>
        </div>
      </div>
    );
  }
}

export default Task;
