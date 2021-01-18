import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/Tasks";
import Task from "../components/Task";
import NewTask from "../components/NewTask";
import EditTask from "../components/EditTask";
import Tags from "../components/Tags";
import Tag from "../components/Tag";
import NewTag from "../components/NewTag";
import EditTag from "../components/EditTag";
import Search from "../components/Search";
import NavBar from "../components/NavBar";
import UserSignup from "../components/UserSignup";
import UserLogin from "../components/UserLogin";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged_in: false,
      currentUser: ""
    };
  }

  componentDidMount() {
    const url = '/api/v1/logged_in';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ logged_in: response.logged_in, currentUser: response.user }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    return (
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={this.state.logged_in ? Search : Home} />

          <Route exact path="/tasks" component={this.state.logged_in ? Tasks : Home} />
          <Route exact path="/tasks/new" component={this.state.logged_in ? NewTask : Home} />
          <Route exact path="/tasks/:id" component={this.state.logged_in ? Task : Home} />
          <Route exact path="/tasks/:id/edit" component={this.state.logged_in ? EditTask : Home} />

          <Route exact path="/tags" component={this.state.logged_in ? Tags : Home} />
          <Route exact path="/tags/new" component={this.state.logged_in ? NewTag : Home} />
          <Route exact path="/tags/:id" component={this.state.logged_in ? Tag : Home} />
          <Route exact path="/tags/:id/edit" component={this.state.logged_in ? EditTag : Home} />

          <Route exact path="/users/sign_up" component={UserSignup} />
          <Route exact path="/users/sign_in" component={UserLogin} />

          <Route exact path='*' component={Home} />
        </Switch>
      </Router>
    );

  }
}

export default Index;
