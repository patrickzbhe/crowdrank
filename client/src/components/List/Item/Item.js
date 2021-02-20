import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Item = ({ Item, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleClick = () => {
    setCurrentId(Item._id);
  }

  return (
    <Card className={classes.card}  onClick={handleClick}>
      <CardMedia className={classes.media} image={Item.cover} title={Item.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{Item.name}</Typography>
        <Typography variant="body2">{moment(Item.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === Item?.creator || user?.result?._id === Item?.creator) && (
      <div className={classes.overlay2}>

      </div>
      )}
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{Item.title}</Typography>

      <Button component={Link} to="/view" onClick={() => setCurrentId(Item._id)} style={{ color: 'white' }} size="small">
          <Typography variant="body2" color="textSecondary" component="p">
            View
          </Typography>
        </Button>
        <Button component={Link} to="/vote" onClick={() => setCurrentId(Item._id)} style={{ color: 'white' }} size="small">
          <Typography variant="body2" color="textSecondary" component="p">Vote</Typography>
        </Button>
    </Card>
  );
};

export default Item;
