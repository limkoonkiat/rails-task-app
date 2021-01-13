import React from "react";
import { Link } from "react-router-dom";

export default function TaskForm(props) {

  return (
      <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            {props.form_title}
          </h1>
          <form onSubmit={props.onSubmit}>

            <div className="form-group">
              <label htmlFor="taskName">Name</label>
              <input
                type="string"
                name="name"
                id="taskName"
                className="form-control"
                value={props.data.name}
                required
                onChange={props.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskDescription">Description</label>
              <textarea
                name="description"
                id="taskDescription"
                className="form-control"
                rows="4"
                value={props.data.description}
                onChange={props.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskDate">Date</label>
                <input 
                type="date"
                name="date" 
                id="taskDate"
                className="form-control"
                value={props.data.date}
                required
                onChange={props.onChange}
                />
            </div>
            
            <div className="form-check">
              <input
                type="checkbox"
                name="completed"
                id="taskCompleted"
                className="form-check-input"
                checked={props.data.completed}
                onChange={props.onChange}
              />
              <label className="form_check_label" htmlFor="taskCompleted">Completed</label>
            </div>

            <label htmlFor="taskTags">
              Tags 
              <small> (You can select more than one)</small>
            </label>
            <div id="taskTags">
              {props.data.tag_ids.toString()} 
              {props.data.allTags.map(tag => {
                  return <div className="form-group">
                    <input
                    type="checkbox"
                    key={tag.id}
                    value={tag.id}
                    id={"task_tag_ids_" + tag.id.toString()}
                    defaultChecked={props.data.tag_ids.includes(tag.id)}
                    onChange={props.handleMultipleTagCheckboxes}
                    />
                    <label className="form-check-label" htmlFor={"task_tag_ids_" + tag.id.toString()}>
                      {tag.name}
                    </label>
                  </div>
              })}
            </div>

            <button type="submit" className="btn btn-dark mt-3">
              {props.submit_button_label}
            </button>
            <Link to={props.cancel_path} className="btn btn-link mt-3">
              {props.cancel_button_label}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
