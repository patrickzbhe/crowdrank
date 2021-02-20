import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import Item from './Item/Item';
import useStyles from './styles';

const List = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.tierlist);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();


  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Item  Item={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default List;
