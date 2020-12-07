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

import AssignmentIcon from "@material-ui/icons/Assignment";
import HelpIcon from "@material-ui/icons/Help";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "700px",
    height: 500,
    marginLeft: 10,
  },
  root: {
    backgroundColor: Theme.colors.background,
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
    borderRadius: "20px",
    border: "1px solid #ccc",
    marginRight: theme.spacing(3),
    fontSize: "25px",
    color: theme.palette.common.black,
  },
  whiteText: {
    color: theme.palette.common.white,
  },
  listing: {
    position: "relative",
    backgroundColor: "#f0ffff",
  },
  content: {
    height: 400,
  },
}));

const ProfileContent = ({ reviews, listing, request, purchasedListing }) => {
  const classes = useStyles();

  // state to control whether to render listing or requests
  // const [toggleListing, setToggleListing] = useState("Listings");
  const [value, setValue] = React.useState(0);
  let purchase = [];
  console.log(purchasedListing);
  purchasedListing?.map((obj) => {
    if (obj.item) {
      purchase.push(obj.item);
    }
  });
  console.log(purchase);
  const Content = () => {
    switch (value) {
      case 0:
        return <ListingTable listing={listing} />;
      case 2:
        return <ProfileReviews reviews={reviews} />;
      case 1:
        return <ListingTable listing={purchase} />;
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
          <BottomNavigationAction
            className={classes.toggleBtns}
            label="Listings"
            icon={<AssignmentIcon />}
          />
          <BottomNavigationAction
            className={classes.toggleBtns}
            label="Purchased Items"
            icon={<ShoppingCartIcon />}
          />
          <BottomNavigationAction
            className={classes.toggleBtns}
            label="Reviews"
            icon={<RateReviewIcon />}
          />
        </BottomNavigation>
        <Content />
      </div>
    </div>
  );
};

export default ProfileContent;
