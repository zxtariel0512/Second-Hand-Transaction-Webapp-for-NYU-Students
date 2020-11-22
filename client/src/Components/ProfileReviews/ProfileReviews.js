import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  body: {
    width: "280px",
  },
  container: {
    width: "90%",
    padding: 10,
    margin: "auto",
    borderBottom: "1px solid #ccc",
  },
});
const ProfileReviews = ({ reviews }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.body}>
      {reviews?.map((review, index) => (
        <div className={classes.container}>
          <Typography>
            Rating: {review.rating}. <br />
            Review: {review.description}
          </Typography>
        </div>
      ))}
    </Paper>
  );
};

export default ProfileReviews;
