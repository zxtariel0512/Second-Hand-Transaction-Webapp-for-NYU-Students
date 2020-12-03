import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HomePageContext from "../../View/Home/store/context";
import Input from "@material-ui/core/Input";
const useStyles = makeStyles({
  customSearch: {
    margin: "55px auto",
    textAlign: "center",
  },
  customSearchBar: {
    width: "50%",
    height: "40px",
    lineHeight: "36px",
    paddingLeft: "45px",
    borderRadius: "40px",
    boxShadow: "1px 2px 2px 2px #ccc",
  },
  icon: {
    position: "relative",
    left: 35,
    top: 7,
  },
});
const SearchBar = () => {
  const classes = useStyles();
  // grab listings value from context
  const { filteredListings, setFilteredListings, listings } = useContext(
    HomePageContext
  );

  const onSearchClick = (e) => {
    const value = e.target.value;
    console.log("value", value);
    if (value === "") {
      setFilteredListings(listings);
      return;
    }
    const lowercase = value.toLowerCase();
    const filtered = filteredListings.filter(
      (itemObj) =>
        itemObj.title.toLowerCase().includes(lowercase) ||
        itemObj.category?.toLowerCase().includes(lowercase)
    );
    // console.log("listings", listings);
    setFilteredListings(filtered);
  };
  return (
    <div className={classes.customSearch}>
      <SearchIcon className={classes.icon} />
      <Input
        disableUnderline={true}
        className={classes.customSearchBar}
        placeholder="Type to search items..."
        onChange={onSearchClick}
      />
    </div>
  );
};

export default SearchBar;
