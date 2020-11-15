import React, { useContext } from "react";
import ImgDropAndCropContext from "./Store/ImgDropAndCropContext";
import ImgThumNail from "./ImgThumbNail";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ImgContainerStyle } from "./style";

const useStyles = makeStyles(ImgContainerStyle);

function createRandomId() {
  return (
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    "-" +
    new Date().getTime() +
    "-" +
    Math.random().toString().substr(2, 5)
  );
}

export default function ImgContainer() {
  const classes = useStyles();

  const { croppedImage } = useContext(ImgDropAndCropContext);

  return (
    <Grid className={classes.container} container spacing={3}>
      {croppedImage &&
        croppedImage.map((e) => (
          <Grid item>
            <ImgThumNail id={createRandomId()} key={createRandomId()} src={e} />
          </Grid>
        ))}
    </Grid>
  );
}
