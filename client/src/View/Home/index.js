// view that lists items with a search bar above
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../Components/SearchBar/SearchBar";
import CustomGridList from "../../Components/CustomGridList/CustomGridList";
import { makeStyles } from "@material-ui/core/styles";
import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import { Typography, Button, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import style from "./style";
import HomePageContext from "./store/context";
import MessageContext from "../../Context/MessageContext";
import getListing from "../../Controller/Listing/getListing";

import Logo from "../../Assets/img/Logo.svg";

const useStyles = makeStyles((theme) => style(theme));

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

  const [selectedBtn, setSelectedBtn] = useState();

  const handleClick = (e) => {
    const value = e.target.innerHTML;
    console.log("selected btn", value);
    if (value === "All") {
      setFilteredListings(listings);
      return;
    }
    const lowercase = value.toLowerCase();
    const filtered = listings.filter(
      (itemObj) =>
        itemObj.title.toLowerCase().includes(lowercase) ||
        itemObj.category_id?.toLowerCase().includes(lowercase)
    );
    // console.log("listings", listings);
    setFilteredListings(filtered);
  };
  return (
    <HomePageContext.Provider value={context}>
      <CustomAppBar />
      <div className={classes.container}>
        <div className={classes.header}>
          <img src={Logo} width="150px" height="150px" alt="Logo" />
        </div>
        <SearchBar />

        <div className={classes.categories}>
          <Button
            className={classes.category}
            variant="outlined"
            onClick={(e) => handleClick(e)}
          >
            All
          </Button>
          <Button
            className={classes.category}
            variant="outlined"
            onClick={(e) => handleClick(e)}
          >
            Book
          </Button>
          <Button
            className={classes.category}
            variant="outlined"
            onClick={(e) => handleClick(e)}
          >
            Electronics
          </Button>
          <Button
            className={classes.category}
            variant="outlined"
            onClick={(e) => handleClick(e)}
          >
            Clothes
          </Button>
          <Button
            className={classes.category}
            variant="outlined"
            onClick={(e) => handleClick(e)}
          >
            Cars
          </Button>
        </div>
        <CustomGridList />
        <Link to="/post-item">
          <Paper className={classes.circle}>
            <AddIcon className={classes.addicon}></AddIcon>
          </Paper>
        </Link>
      </div>
    </HomePageContext.Provider>
  );
};

export default Homepage;
