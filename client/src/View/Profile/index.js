import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import ProfileCard from "Components/ProfileCard/ProfileCard";
import CustomAppBar from "Components/CustomAppBar/CustomAppBar";
import ProfileContent from "Components/ProfileContent/ProfileContent";
import Theme from "Theme/theme";
import MessageContext from "Context/MessageContext";
import getProfile from "Controller/getProfile";
import { AuthContext } from "Context/AuthContext";

const useStyles = makeStyles({
  root: {
    marginTop: "-20vh",
    height: "120vh",
    backgroundColor: Theme.colors.background,
  },
  container: {
    width: "80%",
    margin: "30vh auto",
    paddingTop: "8vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
const Index = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState();
  const { setError } = useContext(MessageContext);
  const [authStatus] = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfile("hw1635");
      // show error if request is failed
      res.success ? setProfile(res.data) : setError(res.message);
      console.log(res);
    };
    getProfileData();
  }, []);

  if (!authStatus) {
    history.push("/signup");
  }
  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className={classes.container}>
        <ProfileCard profile={profile} />
        <ProfileContent profile={profile} />
      </div>
    </div>
  );
};

export default Index;
