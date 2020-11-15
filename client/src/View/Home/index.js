// view that lists items with a search bar above
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../Components/SearchBar/SearchBar";
import CustomGridList from "../../Components/CustomGridList/CustomGridList";
import { makeStyles } from "@material-ui/core/styles";
import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import { Typography, Button } from "@material-ui/core";
import style from "./style";
import HomePageContext from "./store/context";
import MessageContext from "../../Context/MessageContext";
import getListing from "../../Controller/Listing/getListing";

import AddIcon from "@material-ui/icons/Add";
import Logo from "../../Assets/img/Logo.svg";

const useStyles = makeStyles(style);

const Homepage = () => {
  const { setError } = useContext(MessageContext);
  const classes = useStyles();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  /**
   * Get the homepage listing when the page is loaded
   */

  useEffect(() => {
    const getHomepageListing = async () => {
      const res = await getListing();
      // show error if request is failed
      res.success ? setListings(res.data) : setError(res.message);
      console.log(res);
      setFilteredListings(res.data);
    };
    getHomepageListing();
  }, []);

  // set the shared stated (context) here
  const context = {
    listings,
    setListings,
    filteredListings,
    setFilteredListings,
  };

  return (
    <>
      <HomePageContext.Provider value={context}>
        <CustomAppBar />
        <div className={classes.container}>
          <div className={classes.header}>
            <img src={Logo} width="150px" height="150px" alt="Logo" />
          </div>
          <SearchBar />
          <div className={classes.categories}>
            <Button className={classes.category} variant="contained">
              Books
            </Button>
            <Button className={classes.category} variant="contained">
              Electronics
            </Button>
            <Button className={classes.category} variant="contained">
              Clothes
            </Button>
            <Button className={classes.category} variant="contained">
              Automobiles
            </Button>
            <Button className={classes.category} variant="contained">
              More
            </Button>
          </div>
          <CustomGridList />
          <Link to="/add">
            <div className={classes.circle}>
              <AddIcon className={classes.addicon}></AddIcon>
            </div>
          </Link>
        </div>
      </HomePageContext.Provider>
    </>
  );
};

export default Homepage;
