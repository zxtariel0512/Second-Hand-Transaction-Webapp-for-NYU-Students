// routes for frontend
import * as React from "react";
import Loadable from "./Utils/loadable";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SingleItem from "View/SingleItem";

const Landing = Loadable("Landing");
const Login = Loadable("Login");
const Signup = Loadable("Signup");
const Home = Loadable("Home");
const Profile = Loadable("Profile");
const PostItem = Loadable("PostItem");

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/me" component={Profile} />
          <Route path="/post-item" component={PostItem} />
          <Route path="/item/:postId" component={SingleItem} />
        </Switch>
      </BrowserRouter>
    );
  }
}
