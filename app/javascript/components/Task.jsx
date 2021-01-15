import React, {Component} from "react";
import { Link } from "react-router-dom";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { task: { name: "", description: "", date: "", completed: false, tag_ids: []}, tags: [] };

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
      .then(response => this.setState({ task: response.task, tags: response.task_tags }))
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
    const { task, tags } = this.state;

    return (
      <div className="">
        <div className="container py-5">
        <h1>{"Task: " + task.name}</h1>
          <div className="row">
            <div className="col-sm-12 col-lg-3">
                <h5 className="mb-2">Description</h5>
                {task.description.length != 0 ? task.description : "No description available."}
            </div>
            <div className="col-sm-12 col-lg-3">
                <h5 className="mb-2">Date</h5>
                {new Date(task.date).toLocaleString().split(",")[0]}
            </div>
            <div className="col-sm-12 col-lg-3">
                <h5 className="mb-2">Status</h5>
                {task.completed ? "Completed" : "Incomplete"}
            </div>
            <div className="col-sm-12 col-lg-3">
                <h5 className="mb-2">Tags</h5>
                {(tags.length != 0) 
                  ? tags.map(tag => (
                    <div key={tag.id}>
                      <Link to={"/tags/" + tag.id}>{tag.name}</Link>
                    </div>
                  )) 
                  : "This task has no tags."
                }
            </div>
          
            <div className="col-sm-12 col-lg-2">
              <Link to={`/tasks/${this.props.match.params.id}/edit`} className="btn btn-primary mt-3">
                Edit Task
              </Link>
              <button type="button" className="btn btn-danger mt-3" onClick={this.deleteTask}>
                Delete Task
              </button>
            </div>
          </div>
          <Link to="/tasks" className="btn btn-secondary mt-3">
            Back to tasks
          </Link>
        </div>
      </div>
    );
  }
}

export default Task;
