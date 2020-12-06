// Custom card that renders each listing item on Home view
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CallReceived } from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";

import ImagePlaceholder from "../../../Assets/img/img-placeholder.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "100%",
    position: "relative",
    boxShadow: "0 0 5px #888",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  media: {
    height: "180px",
    width: "100%",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  cardarea: {
    maxHeight: 1000,
  },
  row: {
    width: "100%",
    position: "absolute",
    bottom: 5,
    display: "flex",
    flexDirection: "row",
    height: "10vh",
    alignItems: "center",
  },
  fixed: {
    position: "absolute",
    bottom: 24,
    right: 25,
    fontSize: 22,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 200,
    fontSize: 22,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "bold",
    paddingLeft: "2vh",
    width: 160,
    wordWrap: "break-word",
  },
});

export default function CustomCard(props) {
  const classes = useStyles();
  // const [checked, setChecked] = useState();
  // TEMP CODE
  let imgurl, price;
  if (props.image_url) {
    imgurl = props.image_url;
  } else if (props.cover_image_url) {
    imgurl = props.cover_image_url;
  } else {
    imgurl = ImagePlaceholder;
  }
  if (props.price) {
    price = props.price;
  } else {
    price = props.original_price;
  }
  return (
    <Grow in={true} timeout={props.timeout}>
      <Card className={classes.root}>
        <Link
          to={{ pathname: `/item/${props._id}`, state: props }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardActionArea className={classes.cardarea}>
            <CardMedia className={classes.media} image={imgurl} />
            <CardContent>
              <Typography gutterBottom className={classes.title}>
                {props.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                by {props.user_id}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div className={classes.row}>
              {props.category ? <LocalOfferIcon /> : null}
              <p className={classes.categoryText}>{props.category}</p>
            </div>
            <Typography className={classes.fixed}>${price}</Typography>
          </CardActions>
        </Link>
      </Card>
    </Grow>
  );
}
