import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import SettingsFrame from './SettingsFrame';


const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#444444',
    },
  },
});

const styles = {
  root: {
    height: '100%',
  },
  content: {
    height: '100%',
  },
  settingFrame: {
    height: '100%',
    overflow: 'auto',
    zIndex: 10,
  },


};

const Dashboard = (props) => {
  const { classes } = props;
  return (
      <div className={classes.root}>
        <AppBar position="relative" color="primary" elevation={2}>
          <Toolbar>
            <Typography variant="h5" color="inherit">
              TCR Simulator
            </Typography>
          </Toolbar>
        </AppBar>
          <SettingsFrame className={classes.settingFrame} />
      </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Dashboard);
