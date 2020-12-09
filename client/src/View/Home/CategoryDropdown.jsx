import React, { useState, useContext } from "react";
import style from "./style";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import getListingByCategory from "../../Controller/Listing/getListingByCategory";
// Context
import HomePageContext from "./store/context";

const useStyles = makeStyles((theme) => style(theme));

export default function CategoryDropdown(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setFilteredListings } = useContext(HomePageContext);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectCategory = async (event) => {
    const res = await getListingByCategory(event.target.innerText);
    res.success
      ? setFilteredListings(res.data.listings)
      : console.error(res.message);
  };

  return (
    <>
      <Button
        className={classes.category}
        variant="outlined"
        key={props.name}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onMouseOver={handleClick}
      >
        {props.name}
      </Button>
      <Menu
        id={`simple-menu-${props.name}`}
        key={`menu-${props.name}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        {props.secondLevel.map((e, i) => (
          <MenuItem
            key={i}
            value={e.name}
            onClick={(event) => handleSelectCategory(event)}
          >
            {e.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
