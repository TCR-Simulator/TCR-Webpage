import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	settingFrame: {
    boxShadow: '2px 0 2px rgba(0,0,0,.1)',
    borderRight: '1px solid rgba(0,0,0,.25)',
    zIndex: 10,
    boxSizing: 'border-box',
    display: 'inline-block',
    height: "100%"
  }
}
class ResultsFrame extends React.Component {
	render() {
		const { className } = this.props;
		return (
			<div id="results" className={className}>
        <h1>Results!</h1>
      </div>);}

}

ResultsFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultsFrame);
