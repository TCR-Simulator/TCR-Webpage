import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TcrBar from './TcrBar';

const styles = {
	// styles
}

class SettingsFrame extends React.Component {

	render() {
		const { className } = this.props;
		return (
			<div id="settings" className={className}>
        <TcrBar></TcrBar>
      </div>);
	}
}

SettingsFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsFrame);