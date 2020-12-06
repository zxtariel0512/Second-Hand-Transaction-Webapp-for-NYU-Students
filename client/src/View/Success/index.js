import React, { useState, useEffect } from "react";

import getPurchase from "Controller/Purchase/getPurchase";
import getProfile from "Controller/getProfile";
import createChat from "Controller/Chat/createChat";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import Phone from "Assets/img/icons/phone.svg";
import Diamond from "Assets/img/icons/diamond.svg";
import Email from "Assets/img/icons/email.svg";
import Graduation from "Assets/img/icons/graduate.svg";
import Home from "Assets/img/icons/home.svg";

const useStyle = makeStyles({
  container: {
    margin: "30px auto",
    maxWidth: "600px",
  },
  textCenter: {
    textAlign: "center",
  },
  card: {
    padding: "15px",
  },
  purchase: {
    display: "flex",
    //justifyContent: "center",
    alignItems: "center",
  },
  purchaseImg: {
    height: "75px",
    width: "75px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
    },
    marginRight: "15px",
  },
  seller: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: "50%",
    marginRight: "15px",
  },
  sellerInfo: {
    flex: 1,
  },
  field: {
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    paddingRight: "2vh",
  },
  goBackBtn: {
    textAlign: "center",
    marginTop: "50px",
  },
});

export default function Index(props) {
  const classes = useStyle();
  const query = new URLSearchParams(props.location.search);
  const sessionId = query.get("session_id");

  const [item, setItem] = useState();
  const [seller, setSeller] = useState();

  useEffect(async () => {
    const createNewChat = async (name, buyer, seller) => {
      const chatDetails = {
        chat: {
          name,
          participants: [buyer, seller],
        },
        message: {
          author: "admin",
          value: `${buyer} bought this item.`,
        },
      };

      const resChat = await createChat(chatDetails);
    };

    const getPurchaseInfo = async () => {
      const resPurchase = await getPurchase(sessionId);
      const purchase = resPurchase.data;

      const resUser = await getProfile(purchase.item.user_id);
      setItem(purchase.item);
      setSeller(resUser.data);

      createNewChat(purchase.item.title, purchase.buyer, purchase.item.user_id);
    };

    await getPurchaseInfo();
  }, []);

  return (
    <div className={classes.container}>
      {item && seller ? (
        <>
          <h3 className={classes.textCenter}>Thank you for your purchase!</h3>
          <h4 className={classes.textCenter}>Purchase Summary</h4>
          <Paper elevation={3} className={classes.card}>
            <div className={classes.purchase}>
              <div className={classes.purchaseImg}>
                <img src={item.cover_image_url}></img>
              </div>
              <div>
                <div>{item.title}</div>
                <div>${item.price || item.original_price}</div>
              </div>
            </div>
          </Paper>
          <h4 className={classes.textCenter}>Seller Information</h4>
          <Paper elevation={3} className={classes.card}>
            <div className={classes.seller}>
              <img className={classes.avatar} src={seller.avatarUrl}></img>
              <div className={classes.sellerInfo}>
                <h4>{seller.name}</h4>
                <div className={classes.field}>
                  <img
                    className={classes.icon}
                    src={Diamond}
                    width="20"
                    height="20"
                  />
                  <div>{seller.credit}</div>
                </div>
                <div className={classes.field}>
                  <img
                    className={classes.icon}
                    src={Phone}
                    width="20"
                    height="20"
                  />
                  <div>{seller.phone}</div>
                </div>
                <div className={classes.field}>
                  <img
                    className={classes.icon}
                    src={Email}
                    width="20"
                    height="20"
                  />
                  <div>{seller.netid + "@nyu.edu"}</div>
                </div>
              </div>
            </div>
          </Paper>
          <div className={classes.goBackBtn}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/home"
            >
              Go back to homepage
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
