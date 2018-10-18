import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TcrBar from './TcrBar';
import BaseCard from './BaseCard';

const agents = [
  {
    type: 'maintainer',
    population: 1,
    behaviors: {
      ignore_quality: false,
      acceptance_likelihood: 50,
    },
  },
  {
    type: 'contributor',
    population: 20,
    behaviors: {
      quality_scale: 70,
      frequency: 15,
    },
  },
  {
    type: 'user',
    population: 50,
  },
];

const styles = {
  agentsList: {
    overflow: 'scroll',
  },
};

const SettingsFrame = (props) => {
  const { classes, className } = props;
  return (
    <div id="settings" className={className}>
      <TcrBar />
      <div id="maintainer" className={classes.agentsList}>
        <List component="nav">
          {agents.map(agent => (
            <ListItem>
              <BaseCard
                type={agent.type}
                population={agent.population}
                quality_scale={agent.quality_scale}
                frequency={agent.frequency}
                acceptance_likelihood={agent.acceptance_likelihood}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

SettingsFrame.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
};

SettingsFrame.defaultProps = {
  className: null,
};

export default withStyles(styles)(SettingsFrame);
