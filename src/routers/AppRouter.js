import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import SuperAdminRoute from "./SuperAdminRoute";

import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
import Admins from "../components/pages/Admins";
import Categories from "../components/pages/Categories";
import Comments from "../components/pages/Comments";
import NewPost from "../components/pages/NewPost";
import EditPost from "../components/pages/EditPost";
import Posts from "../components/pages/Posts";
import Tags from "../components/pages/Tags";
import Profile from "../components/pages/Profile";
import Users from "../components/pages/Users";

const history = createBrowserHistory();
const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <SuperAdminRoute path="/admins" component={Admins} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/comments" component={Comments} />
        <PrivateRoute path="/new" component={NewPost} />
        <PrivateRoute path="/edit/:id" component={EditPost} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/tags" component={Tags} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/users" component={Users} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
