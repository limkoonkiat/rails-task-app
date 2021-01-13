import React, {Component} from "react";
import { Link } from "react-router-dom";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  } 
    
  componentDidMount() {
    const url = '/api/v1/tasks';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map((task, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{task.name}</h5>
            <Link to={`/tasks/${task.id}`} className="btn btn-dark mt-3">
              View Task
            </Link>
            <Link to={`/tasks/${task.id}/edit`} className="btn btn-primary mt-3">
              Edit Task
            </Link>
          </div>
        </div>
      </div>
    ));
    const noTask = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No tasks yet.
        </h4>
      </div>
    );

    return (
      <>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/tasks/new" className="btn btn-dark mt-3">
                Create New Task
              </Link>
            </div>
            <div className="row">
              {tasks.length > 0 ? allTasks : noTask}
            </div>
            <Link to="/" className="btn btn-link mt-3">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Tasks;
