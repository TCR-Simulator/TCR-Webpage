import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	tcrBar: {
    padding: '10px 20px',
  }
}

class SettingsFrame extends React.Component {

	render() {
		const { classes, className } = this.props;
		return (
			<div id="settings" className={className}>
        <Paper elevation={1} square={true} className={classes.tcrBar}>
          <Typography variant="h5" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
      </div>);
	}

}

SettingsFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsFrame);
