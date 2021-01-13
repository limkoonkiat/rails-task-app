import React from "react";
import { Link } from "react-router-dom";

export default function TagForm(props) {
    return (
        <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              {props.form_title}
            </h1>
            <form onSubmit={props.onSubmit}>
              <div className="form-group">
                <label htmlFor="tagName">Name</label>
                <input
                  type="string"
                  name="name"
                  id="tagName"
                  className="form-control"
                  value={props.tag.name}
                  required
                  onChange={props.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark mt-3">
                {props.submit_button_label}
              </button>
              <Link to={props.cancel_action} className="btn btn-link mt-3">
                {props.cancel_button_label}
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
}
