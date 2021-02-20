import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import List from './components/List/List';
import Vote from './components/Vote/Vote';
import View from './components/View/View';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  return (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar setCurrentId={setCurrentId} />
      <Switch>
        <Route path="/" exact><Home currentId={currentId} setCurrentId={setCurrentId}/></Route>
        <Route path="/auth" > <Auth /> </Route>
        <Route path="/view" > <View currentId={currentId} setCurrentId={setCurrentId}/> </Route>
        <Route path="/vote" > <Vote currentId={currentId} setCurrentId={setCurrentId}/> </Route>
      </Switch>
    </Container>
  </BrowserRouter>
  )
};

export default App;