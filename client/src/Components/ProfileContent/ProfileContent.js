import React, { useState } from "react";
import Theme from "Theme/theme";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import ListingTable from "../ListingTable/ListingTable";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

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

const ToggleButtons = ({ toggleListing, setToggleListing }) => {
  const classes = useStyles();

  const handleToggleListing = (event, val) => {
    setToggleListing(val);
  };

  return (
    <ToggleButtonGroup
      className={classes.toggleBtns}
      value={toggleListing}
      exclusive
      onChange={handleToggleListing}
      aria-label="text alignment"
      size="small"
    >
      <ToggleButton value="Listing" aria-label="listing">
        <Typography className={classes.whiteText}>Listings</Typography>
      </ToggleButton>
      <ToggleButton value="Requests" aria-label="request">
        <Typography className={classes.whiteText}>Requests</Typography>
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
    <div className={classes.container}>
      <div className={classes.listing}>
        <Typography variant="h5" className={classes.title}>
          Your {toggleListing}
        </Typography>
        <div className={classes.toggle}>
          <ToggleButtons
            toggleListing={toggleListing}
            setToggleListing={setToggleListing}
          />
        </div>
        <ListingTable listing={listing} />
      </div>
    </div>
  );
};

export default ProfileContent;
