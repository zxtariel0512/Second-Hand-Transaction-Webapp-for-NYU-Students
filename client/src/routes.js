// routes for frontend
import * as React from "react";
import Loadable from "react-loadable";
import LoadingView from "./views/LoadingView";

import { BrowserRouter, Switch, Route } from "react-router-dom";
const Landing = Loadable({
  loader: () => import("./views/Landing"),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

const Signup = Loadable({
  loader: () => import("./views/Signup"),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

const Login = Loadable({
  loader: () => import("./views/Login"),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

const Home = Loadable({
  loader: () => import("./views/Home"),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}
