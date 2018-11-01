import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Player from './Player';

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={Player} props={childProps} />
  </Switch>
);
