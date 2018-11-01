import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
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
      <Route path="/profile" component={UserProfile} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter>
);

App.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(App);
