import React, { useState } from "react";
import Theme from "Theme/theme";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import ListingTable from "../ListingTable/ListingTable";

import ProfileReviews from "Components/ProfileReviews/ProfileReviews";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "700px",
    height: 500,
  },
  title: {
    fontWeight: 300,
    position: "absolute",
    top: 10,
    left: 10,
  },
  toggle: {
    position: "absolute",
    top: 10,
    right: 0,
  },
  toggleBtns: {
    backgroundColor: theme.palette.common.black,
  },
  whiteText: {
    color: theme.palette.common.white,
  },
  listing: {
    position: "relative",
    backgroundColor: "#f0ffff",
  },
}));

const ProfileContent = ({ reviews, listing, request }) => {
  const classes = useStyles();

  // state to control whether to render listing or requests
  // const [toggleListing, setToggleListing] = useState("Listings");
  const [value, setValue] = React.useState(0);
  console.log(value);
  const Content = () => {
    console.log(reviews);
    switch (value) {
      case 0:
        return <ListingTable listing={listing} />;
      case 2:
        return <ProfileReviews reviews={reviews} />;
      case 1:
        return <ListingTable listing={listing} />;
      default:
        return null;
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.listing}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Listings" />
          <BottomNavigationAction label="Requests" />
          <BottomNavigationAction label="Reviews" />
        </BottomNavigation>
        <Content />
      </div>
    </div>
  );
};

export default ProfileContent;
