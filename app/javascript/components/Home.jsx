import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Welcome!</h1>
        <p className="lead">
          Task tracker.
        </p>
        <hr className="my-4" />
        <Link
          to="/tasks"
          className="btn btn-lg btn-dark"
          role="button"
        >
          View Tasks
        </Link>
        <Link
          to="/tags"
          className="btn btn-lg btn-dark"
          role="button"
        >
          View Tags
        </Link>
      </div>
    </div>
  </div>
);
