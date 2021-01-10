import React, {Component} from "react";
import { Link } from "react-router-dom";

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  } 
    
  componentDidMount() {
    const url = "/api/v1/tags";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tags: response }))
      .catch(() => this.props.history.push("/"));
  }

render() {
    const { tags } = this.state;
    const allTags = tags.map((tag, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{tag.name}</h5>
            <Link to={`/tags/${tag.id}`} className="btn custom-button">
              View Tag
            </Link>
          </div>
        </div>
      </div>
    ));
    const noTag = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No tags yet.
        </h4>
      </div>
    );

    return (
      <>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/tags/new" className="btn btn-dark">
                Create New Tag
              </Link>
            </div>
            <div className="row">
              {tags.length > 0 ? allTags : noTag}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

  export default Tags;
