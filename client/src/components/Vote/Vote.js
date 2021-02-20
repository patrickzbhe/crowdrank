import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, findMatch, sendVote } from '../../actions/posts';
import { Grid, CircularProgress, Card, Typography, CardMedia } from '@material-ui/core';
import useStyles from './styles';

const Vote = ({currentId, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [counter,setCounter] = useState(0);
  useEffect(() => dispatch(findMatch(currentId)), [counter])
  const user = JSON.parse(localStorage.getItem('profile'));
  const posts = useSelector((state) => state.tierlist);

  const firstWin = () => {
    dispatch(sendVote(posts.data[0], posts.data[1], currentId));
    setCounter(counter + 1);
  };

  const secondWin = () => {
    dispatch(sendVote(posts.data[1], posts.data[0], currentId));
    setCounter(counter + 1);
  };
  let tooMany = false;
  if (posts.data && posts.data.length > 2 ) {
    posts.data[2].votes.forEach((e) => {
      if (e[0] == user?.result?._id) {
        if (e[1] > posts.data[2].elements.length * 2) {
          tooMany = true;
        }
      }
    });
  }

  if (tooMany) {
    return (
      <Typography variant='h3'>You voted too many times, click view to view the results</Typography>
    )
  }

  if (posts.data && posts.data.length > 2 && !tooMany) {
    return (
      <>
      <Typography variant='h1'>Vote for the best one!</Typography>
      <Grid className={classes.container} container alignItems="stretch"  spacing={3}>
        <Grid item xs={12} sm={6} md={6} onClick={firstWin}>
          <Card>
          <CardMedia className={classes.media} image={posts.data[0].image || ''}>
            
          </CardMedia>
          <Typography>{posts.data[0].title}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} onClick={secondWin}>          
        <Card >
          <CardMedia className={classes.media} image={posts.data[1].image || ''}></CardMedia>
          <Typography>{posts.data[1].title}</Typography>
        </Card>
        </Grid>
      </Grid>
      </>
    ) } else {
    return (<Typography>Something wrong happened</Typography>);
  }
}

export default Vote
