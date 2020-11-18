import React, { useState } from "react";
import { Grid, Box, Container, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Stepper from "./Stepper";
import MessageContext from "../../Context/MessageContext";
import PostItemContext from "./store/context";

export default function PostItemPage() {
  const [croppedImages, setCroppedImages] = useState([]);

  return (
    <PostItemContext.Provider value={{ croppedImages, setCroppedImages }}>
      <Container>
        <Box display="flex" justifyContent="center" mt="8vh">
          <Typography variant="h3">
            <ShoppingCartIcon style={{ fontSize: "2rem" }} /> Start Selling
          </Typography>
        </Box>
        <Box mt="40px">
          <Stepper />
        </Box>
      </Container>
    </PostItemContext.Provider>
  );
}
