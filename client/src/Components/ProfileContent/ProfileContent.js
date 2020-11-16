import React from "react";
import Theme from "Theme/theme";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: 500,
    boxShadow: "0 0 5px #888",
    marginLeft: "4vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ProfileContent = ({ listing }) => {
  const classes = useStyles();
  console.log(listing);

  return (
    <Card className={classes.container}>
      {/* <div className={classes.listing}>
        {listing?.map((listing) => (
          <Typography>{listing.title}</Typography>
        ))}
      </div> */}
      Incomplete...
    </Card>
  );
};

export default ProfileContent;
