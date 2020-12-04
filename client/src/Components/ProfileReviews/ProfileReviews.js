import { Paper, Typography, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  scrollview: {
    height: 400,
    overflow: "scroll",
    marginTop: 30,
    width: "100%",
  },
  body: {
    width: "80%",
    margin: "0 auto",
    position: "relative",
  },
  container: {
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  fixed: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});

const transformed = (rating) => {};
const ProfileReviews = ({ reviews }) => {
  const classes = useStyles();
  const Review = ({ review }) => {
    return (
      <Paper className={classes.body}>
        <Box component="fieldset" mb={6} borderColor="transparent">
          <Rating name="read-only" value={review.rating} readOnly />
          <div className={classes.fixed}>
            {review.reviewer ? (
              <Typography style={{ fontFamily: "Roboto" }}>
                - {review.reviewer}
              </Typography>
            ) : (
              <Typography style={{ fontFamily: "Roboto" }}>
                - anonymous
              </Typography>
            )}
          </div>
          {review.description ? (
            <Typography>{review.description}</Typography>
          ) : (
            <Typography>No Comment</Typography>
          )}
        </Box>
      </Paper>
    );
  };
  return (
    <div className={classes.scrollview}>
      {reviews?.map((review, index) => (
        <Review review={review} />
      ))}
    </div>
  );
};

export default ProfileReviews;
