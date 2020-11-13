import ProfileCard from "Components/ProfileCard/ProfileCard";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomAppBar from "Components/CustomAppBar/CustomAppBar";
import ProfileContent from "Components/ProfileContent/ProfileContent";
import Theme from "Theme/theme";

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
  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className={classes.container}>
        <ProfileCard />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Index;
