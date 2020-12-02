import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import ProfileCard from "Components/ProfileCard/ProfileCard";
import CustomAppBar from "Components/CustomAppBar/CustomAppBar";
import ProfileContent from "Components/ProfileContent/ProfileContent";

import Theme from "Theme/theme";
import MessageContext from "Context/MessageContext";
import getProfile from "Controller/getProfile";
import getUserListing from "Controller/Listing/getUserListing";
import { AuthContext } from "Context/AuthContext";

const useStyles = makeStyles({
  root: {
    marginTop: "-30vh",
    height: "130vh",
    backgroundColor: Theme.colors.background,
  },
  container: {
    width: "80%",
    margin: "30vh auto",
    paddingTop: "18vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
const Index = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState();
  const [listing, setListing] = useState();
  const { setError } = useContext(MessageContext);
  const [authStatus, setAuthStatus, checkStatus, token] = useContext(
    AuthContext
  );
  const history = useHistory();
  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfile(localStorage.getItem("netid"));
      // show error if request is failed
      res.success ? setProfile(res.data) : setError(res.message);
      console.log(profile);
    };
    const getUserListingData = async () => {
      const res = await getUserListing(localStorage.getItem("netid"), token);
      // show error if request is failed
      console.log(res.data);
      res.success ? setListing(res.data) : setError(res.message);
    };
    getUserListingData();
    getProfileData();
  }, []);

  if (!authStatus) {
    history.push("/signup");
  }
  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className={classes.container}>
        {/* to display user info */}
        <ProfileCard profile={profile} />
        {/* to display user listings, reviews of the user */}
        <ProfileContent listing={listing} reviews={profile?.reviews} />
      </div>
    </div>
  );
};

export default Index;
