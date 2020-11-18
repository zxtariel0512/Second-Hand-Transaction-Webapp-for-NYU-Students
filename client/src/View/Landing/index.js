import React, { useContext } from "react";
import Header from "../../Components/Template/Header/Header";
import GridContainer from "../../Components/Template/Grid/GridContainer";
import GridItem from "../../Components/Template/Grid/GridItem";
import Button from "../../Components/Template/CustomButtons/Button";
import HeaderLinks from "../../Components/Template/Header/HeaderLinks.js";
import Parallax from "../../Components/Template/Parallax/Parallax.js";
import styles from "../../Assets/jss/material-kit-react/views/landingPage.js";
import StorefrontIcon from "@material-ui/icons/Storefront";
import BackgroundImg from "../../Assets/img/landing-bg.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AuthContext } from "Context/AuthContext";
const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function Home(props) {
  const classes = useStyles();
  const [authStatus] = useContext(AuthContext);
  const { ...rest } = props;
  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={
          <>
            <span style={{ fontSize: "30px", fontWeight: "500" }}>
              <StorefrontIcon />
              &nbsp;NYU Second Hand
            </span>
          </>
        }
        rightLinks={authStatus ? null : <HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      ></Header>
      <Parallax filter image={BackgroundImg} style={{ height: "100vh" }}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              &nbsp;
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Sell Your Second Hand Items</h1>
              <p>
                By students, for students, we are here to help you to sell your
                second-hand items.
              </p>
              <br />
              <Button
                color="danger"
                size="lg"
                href="/signup"
                rel="noopener noreferrer"
              >
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Start Selling
                </Link>
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </>
  );
}
