import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import IconButton from "@material-ui/core/IconButton";
import SampleAvatar from "Assets/img/faces/christian.jpg";

const useStyles = makeStyles({
  container: {
    width: 350,
    height: 500,
    boxShadow: "0 0 5px #888",
    textAlign: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
  contactList: {},
  contactIcon: {},
});

const ProfileCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <p> ProfileCard</p>
      <IconButton>
        <img
          className={classes.avatar}
          src={SampleAvatar}
          width="70"
          height="70"
          alt="avatar"
        ></img>
      </IconButton>
      <div className={classes.contactList}>
        <IconButton className={classes.contactIcon} />
        <p>+1 123-456-7890</p>
      </div>
      {/* <Menu> */}
    </Card>
  );
};

export default ProfileCard;
