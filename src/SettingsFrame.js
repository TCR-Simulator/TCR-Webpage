import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FullWidthTabs from './Tab';

const styles = {
  settings: {
  },
};

const SettingsFrame = (props) => {
  const { className } = props;
  return (
    <div id="settings" className={className}>
      <Grid container justify="center">
        <FullWidthTabs />
      </Grid>
    </div>
  );
};

SettingsFrame.propTypes = {
  className: PropTypes.string, // eslint-disable-line react/forbid-prop-types
};

SettingsFrame.defaultProps = {
  className: null,
};

export default withStyles(styles)(SettingsFrame);
