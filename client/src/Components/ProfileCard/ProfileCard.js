import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

import {
  Button,
  Typography,
  TextField,
  Card,
  Modal,
  Backdrop,
  Fade,
  Paper,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import updateUser from "Controller/User/updateUser";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";

import AvatarCropper from "Components/AvatarCropper";

import IconButton from "@material-ui/core/IconButton";
import SampleAvatar from "Assets/img/faces/christian.jpg";
import Phone from "Assets/img/icons/phone.svg";
import Diamond from "Assets/img/icons/diamond.svg";
import Email from "Assets/img/icons/email.svg";
import Graduation from "Assets/img/icons/graduate.svg";

const useStyles = makeStyles((theme) => ({
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
  input: {
    padding: theme.spacing(0.6),
  },
  buttons: {
    margin: 10,
  },
  avatarContainer: {
    position: "relative",
    marginTop: "4vh",
  },
  editicon: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 90,
    bottom: 0,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Contact = ({ img, info }) => {
  const classes = useStyles();

  return (
    <div className={classes.contact}>
      <img
        className={classes.icon}
        src={img}
        width="20"
        height="20"
        alt={info}
      />
      <p className={classes.alignLeft}>{info}</p>
    </div>
  );
};

const AvatarModal = ({ classes, editAvatar, setEditAvatar, profile }) => {
  return (
    <Modal
      className={classes.modal}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={() => setEditAvatar(true)}
      onClose={() => setEditAvatar(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={() => setEditAvatar(true)}>
        <Paper className={classes.paper}>
          <AvatarCropper setEditAvatar={setEditAvatar} profile={profile} />
        </Paper>
      </Fade>
    </Modal>
  );
};
const ProfileCard = ({ profile }) => {
  const classes = useStyles();
  const history = useHistory();
  const [edit, toggleEdit] = useState(false);
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const [editAvatar, setEditAvatar] = useState(false);

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
      <div className={classes.avatarContainer}>
        <img
          className={classes.avatar}
          src={profile?.avatarUrl}
          alt="avatar"
        ></img>
        <IconButton className={classes.editicon}>
          <EditIcon onClick={() => setEditAvatar(true)} />
        </IconButton>
      </div>
      {editAvatar && (
        <AvatarModal
          classes={classes}
          editAvatar={editAvatar}
          setEditAvatar={setEditAvatar}
          profile={profile}
        />
      )}
      <Typography variant="h5" style={{ marginTop: 20 }}>
        {profile?.name}
      </Typography>
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
