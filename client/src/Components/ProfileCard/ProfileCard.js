import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Button, Typography } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import SampleAvatar from "Assets/img/faces/christian.jpg";
import Phone from "Assets/img/icons/phone.svg";
import Diamond from "Assets/img/icons/diamond.svg";
import Email from "Assets/img/icons/email.svg";

const useStyles = makeStyles({
  container: {
    width: 350,
    height: 500,
    boxShadow: "0 0 5px #888",
    textAlign: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
  },
  contactList: {
    width: "70%",
    margin: "auto",
    paddingTop: "10vh",
    paddingBottom: "10vh",
  },
  contact: {
    marginTop: "-10px",

    display: "flex",
    alignItems: "center",
  },
  icon: {
    paddingRight: "3vh",
  },
});

const Contact = ({ img, info }) => {
  const classes = useStyles();
  return (
    <div className={classes.contact}>
      <img className={classes.icon} src={img} width="20" height="20" />
      <p>{info}</p>
    </div>
  );
};
const ProfileCard = ({ profile }) => {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <IconButton>
        <img className={classes.avatar} src={SampleAvatar} alt="avatar"></img>
      </IconButton>
      <Typography variant="h5">{profile?.name}</Typography>
      <div className={classes.contactList}>
        <Contact img={Diamond} info={profile?.credit} />
        <Contact img={Phone} info={profile?.phone} />
        <Contact img={Email} info={`${profile?.username}@nyu.edu`} />
      </div>
      <Button variant="outlined" color="primary">
        Edit
      </Button>
      {/* <Menu> */}
    </Card>
  );
};

export default ProfileCard;
