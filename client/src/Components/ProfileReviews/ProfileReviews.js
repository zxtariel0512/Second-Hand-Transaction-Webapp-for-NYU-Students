import { Paper, Typography } from "@material-ui/core";
import React from "react";
import ReviewSection from "View/PostItem/Reviews";

const ProfileReviews = ({ reviews }) => {
  return (
    <Paper>
      {reviews?.map((review, index) => (
        <Typography>
          {index + 1}. Rating: {review.rating}. Review: {review.description}
        </Typography>
      ))}
    </Paper>
  );
};

export default ProfileReviews;
