import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from "react-bootstrap/FormControl";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };

    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeQuery(event) {
    this.setState({ query: event.target.value });
  }

  onSubmit(event) {
    {/* NOTE: Everything after the ? in the url is called "query string parameters" i.e. query=${this.state.query} here.
    It is automatically available in the params hash in the controller thus we can just link like that with the query data passed on.
    See part 4 parameters at https://guides.rubyonrails.org/action_controller_overview.html#http-basic-authentication */}

    let queryString = "query=" + this.state.query;
    this.props.history.push(`/search?${queryString}`);
  }

  render() {
    return (
      <Form inline onSubmit={this.onSubmit}>
        <FormControl
          type="search"
          placeholder="Search Tasks"
          className="mr-sm-2"
          name="query"
          required
          value={this.state.query}
          onChange={this.onChangeQuery}
        />

        <Button variant="info" type="submit">Search</Button>
      </Form>
    );
  }
}

export default withRouter(SearchBar);
