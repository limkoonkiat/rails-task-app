import React, {Component} from "react";
import { Link } from "react-router-dom";

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = { tag: { name: ""} };

    this.deleteTag = this.deleteTag.bind(this);
  }
  
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/tags/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tag: response }))
      .catch(() => this.props.history.push("/tags"));
  }

  deleteTag() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/tags/${id}`;
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
      .then(() => this.props.history.push("/tags"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { tag } = this.state;

    return (
      <div className="">
        <div className="container py-5">
        <h1>{"Tag: " + tag.name}</h1>
          <div className="row">
            <div className="col-sm-12 col-lg-2">
              <Link to={`/tags/${this.props.match.params.id}/edit`} className="btn btn-primary">
                Edit Tag
              </Link>
              <button type="button" className="btn btn-danger" onClick={this.deleteTag} data-confirm="Are you sure you want to delete this tag?">
                Delete Tag
              </button>
            </div>
          </div>
          <Link to="/tags" className="btn btn-secondary">
            Back to tags
          </Link>
        </div>
      </div>
    );
  }
}

export default Tag;
