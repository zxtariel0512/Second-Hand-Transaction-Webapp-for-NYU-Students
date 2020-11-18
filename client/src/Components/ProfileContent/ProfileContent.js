import React, { useState } from "react";
import Theme from "Theme/theme";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import ListingTable from "../ListingTable/ListingTable";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ProfileReviews from "Components/ProfileReviews/ProfileReviews";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: 500,
    marginLeft: "4vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  title: {
    fontWeight: 300,
    position: "absolute",
    top: 90,
  },
  toggle: {
    position: "absolute",
    top: 90,
    right: 130,
  },
});

const ToggleButtons = ({ toggleListing, setToggleListing }) => {
  const handleToggleListing = (event, val) => {
    setToggleListing(val);
  };

  return (
    <ToggleButtonGroup
      value={toggleListing}
      exclusive
      onChange={handleToggleListing}
      aria-label="text alignment"
    >
      <ToggleButton value="Listing" aria-label="listing">
        <Typography>Listings</Typography>
      </ToggleButton>
      <ToggleButton value="Requests" aria-label="request">
        <Typography>Requests</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
const ProfileContent = ({ listing }) => {
  const classes = useStyles();

  // state to control whether to render listing or requests
  const [toggleListing, setToggleListing] = useState("Listings");
  console.log(toggleListing);
  return (
    <div className="container">
      <Typography variant="h5" className={classes.title}>
        Your {toggleListing}
      </Typography>
      <div className={classes.toggle}>
        <ToggleButtons
          toggleListing={toggleListing}
          setToggleListing={setToggleListing}
        />
      </div>
      <div className={classes.listing}>
        <ListingTable listing={listing} />
      </div>
      <ProfileReviews />
    </div>
  );
};

export default ProfileContent;
