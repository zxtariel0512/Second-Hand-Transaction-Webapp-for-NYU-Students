import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%'
  },
  media: {
    height: 140,
  },
  cardarea: {
    maxHeight: 300
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fixed: {
    marginRight: 30,
    fontSize: 15
  }
});

export default function CustomCard(props) {
  const classes = useStyles();
  // console.log(props);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardarea}>
        <CardMedia
          className={classes.media}
          image={props.image_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            by {props.user_id}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions classes={classes.row}>
          {props.category_id ? <LocalOfferIcon/> : null }
          <Typography variant="h7">
            {props.category_id}
          </Typography>
          
          <Typography classes={classes.fixed} variant="h7">
            ${props.price}
          </Typography>
       
      </CardActions>
    </Card>
  );
}
