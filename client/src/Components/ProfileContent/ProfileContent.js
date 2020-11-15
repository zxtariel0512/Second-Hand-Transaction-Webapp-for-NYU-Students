import React from "react";
import Theme from "Theme/theme";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: 500,
    boxShadow: "0 0 5px #888",
    marginLeft: "4vh",
  },
});

const ProfileContent = ({ listing }) => {
  const classes = useStyles();
  console.log(listing);

  return (
    <Card className={classes.container}>
      <div className={classes.listing}>
        {listing?.map((listing) => (
          <p>{listing.title}</p>
        ))}
      </div>
    </Card>
  );
};

export default ProfileContent;
