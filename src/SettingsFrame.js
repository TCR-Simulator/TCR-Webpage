import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FullWidthTabs from './Tab';
import Grid from '@material-ui/core/Grid';

const styles = {
  settings: {
  },
};

const SettingsFrame = (props) => {
  const { classes, className } = props;
  return (
   
    <div id="settings" className={className}>
      <Grid container justify = "center">
          <FullWidthTabs/>
      </Grid>
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
