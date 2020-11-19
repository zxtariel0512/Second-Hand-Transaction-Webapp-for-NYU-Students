import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomAppBar from "Components/CustomAppBar/CustomAppBar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

import Avatar from "Assets/img/faces/avatar-example.jpg";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: "15vh",
    margin: "auto",
    maxWidth: "70vw",
    width: "80%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
  },
  imageContainer: {},
  portrait: {
    width: 400,
    height: 550,
    border: "1px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coverImg: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  itemInfoContainer: {
    marginLeft: "10vw",
    width: "30vw",
  },
  pricetag: {
    color: theme.palette.primary.main,
  },
  sellerInfo: {
    color: "grey",
    width: 150,
    position: "relative",
  },
  avatar: {
    borderRadius: "50%",
    position: "absolute",
    right: 0,
    top: -18,
  },
  longbtn: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

const PoppinsFont = withStyles((theme) => ({
  root: {
    fontFamily: "Roboto",
    paddingBottom: "20px",
  },
}))(Typography);

const SingleItem = () => {
  const { postId } = useParams();
  const location = useLocation();
  const item = location.state;
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <CustomAppBar />
      <div className={classes.row}>
        <div className={classes.imageContainer}>
          <div className={classes.portrait}>
            <img
              className={classes.coverImg}
              src={item.image_url}
              alt="cover"
            ></img>
          </div>
          {/* render other pics here */}
        </div>
        <div className={classes.itemInfoContainer}>
          <PoppinsFont variant="h4" style={{ fontWeight: 800 }}>
            {item?.title}
          </PoppinsFont>
          <div className={classes.avatarRow}>
            <PoppinsFont variant="h4" className={classes.pricetag}>
              ${item?.price}
            </PoppinsFont>
            <div className={classes.sellerInfo}>
              <PoppinsFont variant="p" className={classes.postedby}>
                by {item?.user_id}
              </PoppinsFont>
              <img
                src={Avatar}
                className={classes.avatar}
                width={60}
                height={60}
                alt="user avatar"
              ></img>
            </div>
          </div>
          <Typography variant="h5">Item description:</Typography>
          <PoppinsFont variant="subheader1">{item?.description}</PoppinsFont>
          <br />
          <br />
          <Typography variant="h5">Shipment:</Typography>
          <PoppinsFont variant="subheader1">{item?.shipment}</PoppinsFont>
          <br />
          <br />
          <br />
          <br />
          <Button
            className={classes.longbtn}
            variant="outlined"
            color="primary"
          >
            Buy!
          </Button>
          <p style={{ textAlign: "center" }}> or have questions? </p>
          <Button
            className={classes.longbtn}
            variant="outlined"
            color="primary"
          >
            Chat with the seller!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
