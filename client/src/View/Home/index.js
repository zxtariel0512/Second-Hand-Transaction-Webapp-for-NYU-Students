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
import Categories from "./Categories";

const useStyles = makeStyles((theme) => style(theme));

const Homepage = () => {
  const { setError } = useContext(MessageContext);
  const classes = useStyles();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState();
  /**
   * Get the homepage listing when the page is loaded
   */
  const getHomepageListing = async (pageNumber, limit) => {
    const res = await getListing({ pageNum: pageNumber, limit: limit });
    // show error if request is failed
    res.success ? setListings(res.data.docs) : setError(res.message);
    console.log(res);
    setTotalPage(res.data.totalPages);
    setFilteredListings(res.data.docs);
  };
  useEffect(() => {
    // the default page limit is 9
    getHomepageListing(pageNum, 9);
  }, [pageNum]);

  // set the shared stated (context) here
  const context = {
    listings,
    setListings,
    filteredListings,
    setFilteredListings,
    pageNum,
    setPageNum,
    totalPage,
  };

  const handleClick = (e) => {
    const value = e.target.textContent;
    console.log("selected btn", value);
    if (value === "All") {
      setFilteredListings(listings);
      return;
    }
    const lowercase = value.toLowerCase();
    const filtered = listings.filter(
      (itemObj) =>
        itemObj.title.toLowerCase().includes(lowercase) ||
        itemObj.category?.toLowerCase().includes(lowercase)
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
        <Categories />
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
