import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Button, Typography, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import updateUser from "Controller/User/updateUser";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";

import IconButton from "@material-ui/core/IconButton";
import SampleAvatar from "Assets/img/faces/christian.jpg";
import Phone from "Assets/img/icons/phone.svg";
import Diamond from "Assets/img/icons/diamond.svg";
import Email from "Assets/img/icons/email.svg";
import Graduation from "Assets/img/icons/graduate.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "300px",
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
  input: {
    padding: theme.spacing(0.6),
  },
  buttons: {
    margin: 10,
  },
}));

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
  const history = useHistory();
  const [edit, toggleEdit] = useState(false);
  const { register, handleSubmit } = useForm({ mode: "onBlur" });

  const submitForm = async (input) => {
    let filtered = {};
    for (const attribute in input) {
      if (input[attribute] !== "") {
        filtered[attribute] = input[attribute];
      }
    }
    try {
      const user = await Auth.currentSession();
      const token = user.getIdToken().jwtToken;
      updateUser(profile.netid, filtered, token);
      // refresh page to get updated data
      history.go(0);
    } catch {
      console.log("error");
    }
  };
  return (
    <Card className={classes.container}>
      <IconButton>
        <img className={classes.avatar} src={SampleAvatar} alt="avatar"></img>
      </IconButton>
      <Typography variant="h5">{profile?.name}</Typography>
      <div className={classes.contactList}>
        {edit ? (
          <form
            className={classes.form}
            onSubmit={handleSubmit(submitForm)}
            noValidate
          >
            <TextField
              id="outlined-basic"
              variant="standard"
              label="Phone number"
              name="phone"
              className={classes.input}
              placeholder={profile?.phone}
              inputRef={register({
                required: false,
              })}
            />
            <TextField
              id="outlined-basic"
              variant="standard"
              label="School year"
              name="schoolYear"
              placeholder={profile?.schoolYear}
              className={classes.input}
              inputRef={register({
                required: false,
              })}
            />
            <TextField
              id="outlined-basic"
              variant="standard"
              label="Major"
              name="major"
              placeholder={profile?.major}
              className={classes.input}
              inputRef={register({
                required: false,
              })}
            />

            <Button
              className={classes.buttons}
              variant="outlined"
              color="primary"
              onClick={() => {
                toggleEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className={classes.buttons}
              variant="outlined"
              color="primary"
              type="submit"
            >
              Done
            </Button>
          </form>
        ) : (
          <>
            <Contact img={Diamond} info={profile?.credit} />
            <Contact img={Phone} info={profile?.phone} />
            <Contact img={Email} info={`${profile?.username}@nyu.edu`} />
            {profile?.schoolYear ? (
              <Contact
                img={Graduation}
                info={`${profile.major} Major, Graduate in ${profile?.schoolYear}`}
              />
            ) : null}
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              className={classes.editBtn}
              onClick={() => {
                toggleEdit(!edit);
              }}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
