import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />

      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/tasks/new" component={NewTask} />
      <Route exact path="/tasks/:id" component={Task} /> 
      <Route exact path="/tasks/:id/edit" component={EditTask} />

      <Route exact path="/tags" component={Tags} />
      <Route exact path="/tags/new" component={NewTag} />
      <Route exact path="/tags/:id" component={Tag} />
      <Route exact path="/tags/:id/edit" component={EditTag} /> 

      <Route exact path='*' component={Home} />
    </Switch>
  </Router>
);
