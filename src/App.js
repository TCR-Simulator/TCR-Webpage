import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';
import Player from './Player';
import Admin from './admin/Admin';

const styles = {

};

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Player} />
      <Route path="/player" component={Player} />
      <Route path="/admin" component={Admin} />
      <Route path="/profile" component={UserProfile} />
    </Switch>
  </BrowserRouter>
);

export default withStyles(styles)(App);
