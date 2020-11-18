import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Button, Typography } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import SampleAvatar from "Assets/img/faces/christian.jpg";
import Phone from "Assets/img/icons/phone.svg";
import Diamond from "Assets/img/icons/diamond.svg";
import Email from "Assets/img/icons/email.svg";
import Graduation from "Assets/img/icons/graduate.svg";

const useStyles = makeStyles({
  container: {
    width: 300,
    height: 500,
    boxShadow: "0 0 5px #888",
    textAlign: "center",
    position: "relative",
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

  alignLeft: {
    textAlign: "left",
  },
});

const Contact = ({ img, info }) => {
  const classes = useStyles();
  return (
    <div className={classes.contact}>
      <img className={classes.icon} src={img} width="20" height="20" />
      <p className={classes.alignLeft}>{info}</p>
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
        {profile?.schoolYear ? (
          <Contact
            img={Graduation}
            info={`${profile.major} Major, Graduate in ${profile?.schoolYear}`}
          />
        ) : null}

        <Button variant="outlined" color="primary" className={classes.editBtn}>
          Edit
        </Button>
      </div>

      {/* <Menu> */}
    </Card>
  );
};

export default ProfileCard;
