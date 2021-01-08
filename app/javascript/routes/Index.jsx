import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/Tasks";
import Task from "../components/Task";
import NewTask from "../components/NewTask";


export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/task" component={NewTask} />
      <Route exact path="/tasks/:id" component={Task} /> 
    </Switch>
  </Router>
);
