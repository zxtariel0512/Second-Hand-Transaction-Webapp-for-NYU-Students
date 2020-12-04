// routes for frontend
import * as React from "react";
import Loadable from "./Utils/loadable";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
//import SingleItem from "View/SingleItem";
import { Auth } from "aws-amplify";

const Landing = Loadable("Landing");
const Login = Loadable("Login");
const Signup = Loadable("Signup");
const Home = Loadable("Home");
const Chat = Loadable("Chat");
const Profile = Loadable("Profile");
const PostItem = Loadable("PostItem");
const Success = Loadable("Success");
const SingleItem = Loadable("SingleItem");

/**
 * PrivateRoute only allows user who signed in to access to route
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [token, setToken] = React.useState();
  const history = useHistory();
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await Auth.currentSession();
        const token = user.getIdToken().jwtToken;
        setToken(token);
      } catch {
        console.log("error");
      }
    };
    checkAuth();
  }, []);
  // Bug: if you place Redirect component after the semicolon, it won't work and it always redirects whether
  // there's a token or not...
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>403 Forbidden</h2>
          </div>
        )
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
          <PrivateRoute path="/item/:postId" component={SingleItem} />
          <Route path="*">
            <h2 style={{ textAlign: "center" }}>404 Not Found</h2>
          </Route>
          {/* <Route path="/item/:postId" component={SingleItem} /> */}
          <Route path="/order/success" component={Success} />
          <Route path="*" component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}
