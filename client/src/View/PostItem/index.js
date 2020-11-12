import React from "react";
import { Grid, Box, Container, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Stepper from "./Stepper";
import MessageContext from "../../../Context/MessageContext"
export default function PostItemPage() {
  return (
    <>
      <Container>
        <Box display="flex" justifyContent="center" mt="8vh">
          <Typography variant="h3">
            <ShoppingCartIcon style={{fontSize:"2rem"}} /> Start Selling
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt="40px">
            <Stepper />
        </Box>
      </Container>
    </>
  );
}
