import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts, findMatch } from '../../actions/posts';
import List from '../List/List';
import Form from '../Form/Form';

const Home = ({currentId, setCurrentId}) => {
  const dispatch = useDispatch();
  useEffect(() => setCurrentId(0), [])
  setCurrentId(0);
  dispatch(getPosts());

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={12}>
            <List setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
