import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from 'material-ui-rating'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles({
  root: {
    width: 250,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    props.handleCart(props.bookDetails)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            Book Added to cart Successfully!
          </Alert>
      </Snackbar>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"https://picsum.photos/200/300?random"+(props.bookDetails?props.bookDetails.bookID:"1")}
         
        />
        <CardContent>
          <Typography gutterBottom >
            {props.bookDetails?props.bookDetails.title:"NA"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span>AUTHOR :- </span>
            <span>{props.bookDetails?props.bookDetails.authors:"NA"}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span>PRICE :- </span>
            <span>{props.bookDetails?props.bookDetails.price:"NA"}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button style={{float:"right",backgroundColor:"lightgrey"}} onClick={handleClick}>ADD</Button>
      <Rating
        value={props.bookDetails?props.bookDetails.average_rating:0}
        max={5}
        disableHover = {true}
      />
      
    </Card>
  );
}
