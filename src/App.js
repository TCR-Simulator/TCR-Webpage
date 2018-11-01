import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import SettingsFrame from './SettingsFrame';
import ResultsFrame from './ResultsFrame';


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
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
    display: 'flex',
  },
  settingFrame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    boxShadow: '2px 0 2px rgba(0,0,0,.1)',
    borderRight: '1px solid rgba(0,0,0,.25)',
    zIndex: 10,
    flexBasis: '35%',
    boxSizing: 'border-box',
  },
  resultFrame: {
    flexGrow: 1,
    padding: '0 20px',
  },

};

const Dashboard = (props) => {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="relative" color="primary" elevation={2}>
          <Toolbar>
            <Typography variant="h5" color="inherit">
              TCR Simulator
            </Typography>
          </Toolbar>
        </AppBar>
        <div id="content" className={classes.content}>
          <SettingsFrame className={classes.settingFrame} />
          <ResultsFrame className={classes.resultFrame} />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Dashboard);
