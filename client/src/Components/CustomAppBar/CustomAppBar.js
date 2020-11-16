import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Theme from "../../Theme/theme.js";
import { useHistory } from "react-router";
import LogoutBtn from "../../Assets/img/icons/logout.svg";
import LoginBtn from "Assets/img/icons/login.svg";
import ProfileBtn from "../../Assets/img/icons/user.svg";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { AuthContext } from "Context/AuthContext";
import { Auth } from "aws-amplify";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: theme.palette.primary.light,
  },
  menuButton: {
    position: "absolute",
    right: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'flex-end'
  },
  title: {
    flexGrow: 1,
  },
  brand: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxHeight: "40px",
    marginLeft: 20,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [authStatus, setAuthStatus, checkStatus] = useContext(AuthContext);
  console.log(authStatus);
  async function logout() {
    try {
      await Auth.signOut();
      localStorage.removeItem("netid");
    } catch {
      console.log("err signing out");
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <a href="/home" style={{ textDecoration: "none", color: "black" }}>
            <div className={classes.brand}>
              <StorefrontIcon />
              <span style={{ fontSize: "20px", fontWeight: "400" }}>
                &nbsp;NYU Second Hand
              </span>
            </div>
          </a>

          {authStatus ? (
            <>
              <div className={classes.menuButton}>
                <IconButton
                  onClick={() => {
                    setAuthStatus(false);
                    logout();
                    history.push("/");
                  }}
                >
                  <img src={LogoutBtn} width="20" height="20" alt="Logout" />
                </IconButton>
                <IconButton href="/me">
                  <img src={ProfileBtn} width="20" height="20" alt="Profile" />
                </IconButton>
              </div>
              {/* <span>Hi, Martin</span> */}
            </>
          ) : (
            <div className={classes.menuButton}>
              <IconButton href="/login">
                <img src={LoginBtn} width="20" height="20" alt="Login" />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
