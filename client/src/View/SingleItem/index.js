import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import CustomAppBar from "Components/CustomAppBar/CustomAppBar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Avatar from "Assets/img/faces/avatar-example.jpg";
import ImagePlaceholder from "Assets/img/img-placeholder.png";
import getProfile from "Controller/getProfile";
import getChats from "Controller/Chat/getChats";
import CustomCarousel from "Components/Carousel";
import { AuthContext } from "Context/AuthContext";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: "15vh",
    margin: "auto",
    maxWidth: "90vw",
    width: "90%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
  },
  imageContainer: {
    width: "50%",
  },
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
  const [authStatus, setAuthStatus, checkStatus, token, username] = useContext(
    AuthContext
  );
  // tmep code
  let imgurl;
  let imgurlArr = [];
  let price;
  if (item.image_url) {
    imgurl = item.image_url;
  } else if (item.cover_image_url) {
    imgurl = item.cover_image_url;
    imgurlArr.push(item.cover_image_url);
    imgurlArr = imgurlArr.concat(item.detail_image_urls);
  } else {
    imgurl = ImagePlaceholder;
  }
  if (item.price) {
    price = item.price;
  } else {
    price = item.original_price;
  }
  const [avatarUrl, setAvatarUrl] = useState();
  const [chatId, setChatId] = useState(null);

  useEffect(async () => {
    const getAllChats = async () => {
      const res = await getChats(token);
      return res.data;
    };

    const chats = await getAllChats();
    console.log(chats);
    const foundChat = chats.find((chat) => chat.name == item.title);
    setChatId(foundChat ? foundChat._id : null);
  }, []);

  // fetch user avatar
  useEffect(() => {
    const getAvatarUrl = async () => {
      const res = await getProfile(item?.user_id);
      // show error if request is failed
      console.log(res.data);
      res.success && setAvatarUrl(res.data.avatarUrl);
    };
    getAvatarUrl();
  }, [avatarUrl]);

  return (
    <div className={classes.container}>
      <CustomAppBar />
      <div className={classes.row}>
        <div className={classes.imageContainer}>
          <CustomCarousel images={imgurlArr} />
          {/* <div className={classes.portrait}>
            <img className={classes.coverImg} src={imgurl} alt="cover"></img>
          </div> */}
          {/* render other pics here */}
        </div>

        <div className={classes.itemInfoContainer}>
          <PoppinsFont variant="h4" style={{ fontWeight: 800 }}>
            {item?.title}
          </PoppinsFont>
          <div className={classes.avatarRow}>
            <PoppinsFont variant="h4" className={classes.pricetag}>
              ${price}
            </PoppinsFont>
            <div className={classes.sellerInfo}>
              <PoppinsFont variant="p" className={classes.postedby}>
                by {item?.user_id}
              </PoppinsFont>
              <img
                src={avatarUrl}
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
            component={Link}
            to={{
              pathname: `/chat/${chatId ? chatId : "new"}`,
              listingInfo: item,
            }}
          >
            Chat with the seller!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
