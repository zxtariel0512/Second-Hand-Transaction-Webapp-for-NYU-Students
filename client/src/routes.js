// routes for frontend
import * as React from "react";
import Loadable from "./Utils/loadable";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SingleItem from "View/SingleItem";
import CheckAuth from "./Utils/checkAuth";

const Landing = Loadable("Landing");
const Login = Loadable("Login");
const Signup = Loadable("Signup");
const Home = Loadable("Home");
const Chat = Loadable("Chat");
const Profile = Loadable("Profile");
const PostItem = Loadable("PostItem");
const Listing = Loadable("Listing");

/**
 * PrivateRoute only allows user who signed in to access to route
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        CheckAuth() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute path="/me" component={Profile} />
          <PrivateRoute path="/post-item" component={PostItem} />
          <Route path="/item/:postId" component={SingleItem} />
          <Route path="*" component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}
