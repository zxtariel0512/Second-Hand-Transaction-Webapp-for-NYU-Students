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
  },
  media: {
    height: 140,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fixed: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    fontSize: 15
  }
});

export default function CustomCard(props) {
  const classes = useStyles();
  // console.log(props);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imgurl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            by {props.postedBy}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions classes={classes.row}>
        
          {props.category ? <LocalOfferIcon/> : null }
          <Typography variant="h5" component="h2">
            {props.category}
          </Typography>
          
          <Typography classes={classes.fixed} variant="h5" component="h2">
            {props.price}
          </Typography>
       
      </CardActions>
    </Card>
  );
}
