import React from "react";
import { Box, Divider, Container, Chip } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { getLocalStorage } from "../../../Utils/localstorage";

const useStyles = makeStyles((theme) => ({
  img: {
    height: "130px",
    width: "auto",
    border: "1px solid gray",
    borderRadius: "10px",
    marginRight: "8px",
  },
  price: {
    color: theme.palette.primary.main,
  },
}));

export default function ReviewSection() {
  const classes = useStyles();

  const titleData = getLocalStorage("itemTitle");
  const priceData = getLocalStorage("price");
  const descriptionData = getLocalStorage("itemDescription");
  const categoryData = getLocalStorage("itemCategory");
  const deliveryMethodData = getLocalStorage("deliveryMethod");
  const coverImgData = JSON.parse(getLocalStorage("savedCoverPhoto"));
  const itemImgData = JSON.parse(getLocalStorage("savedSkillPhoto"));

  const coverImg = coverImgData
    ? coverImgData.map((e) => <img className={classes.img} src={e.cropped} />)
    : "";

  const itemImg = itemImgData
    ? itemImgData.map((e) => <img className={classes.img} src={e.cropped} />)
    : "";

  //   const images = getLocalStorage("savedSkillPhoto").map((e) => (
  //     <img className={classes.img} src={e.cropped}></img>
  //   ));

  return (
    <Container maxWidth="sm" style={{ marginBottom: "50px" }}>
      <h1>Review</h1>
      <Divider />
      <Box mt="30px">
        <h3>
          {titleData ? (
            titleData
          ) : (
            <Alert severity="error">You have not added the title</Alert>
          )}
        </h3>
      </Box>
      <Box py="10px">
        {priceData ? (
          <h3> {<span className={classes.price}>$ {priceData}</span>}</h3>
        ) : (
          <Alert severity="error">You have not added the Price</Alert>
        )}
      </Box>
      <Box py="10px">
        {categoryData ? (
          <Chip label={categoryData} style={{ marginRight: "30px" }} />
        ) : (
          <Alert severity="error">You have not added the category</Alert>
        )}
        {deliveryMethodData ? (
          <Chip label={deliveryMethodData} />
        ) : (
          <Alert severity="error">
            You have not selected the delivery method
          </Alert>
        )}
      </Box>
      <Box py="10px">
        {descriptionData ? (
          <p style={{ color: "#333333" }}>
            {getLocalStorage("itemDescription")}
          </p>
        ) : (
          <Alert severity="error">You have not added any description</Alert>
        )}
      </Box>
      <Box py="10px">
        <h4>Cover Image</h4>
      </Box>
      <Box py="10px">
        {coverImg ? (
          coverImg
        ) : (
          <Alert severity="error">You have not upload any Cover Image</Alert>
        )}
      </Box>
      <Box py="10px">
        <h4>Item Images</h4>
      </Box>
      <Box py="10px">
        {itemImg ? (
          itemImg
        ) : (
          <Alert severity="error">You have not upload any Item Image</Alert>
        )}
      </Box>
    </Container>
  );
}
