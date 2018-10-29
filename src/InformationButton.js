import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  customWidth: {
    maxWidth: 500,
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
});


class CustomizedTooltips extends React.Component {
  getDialog() {
    const { content } = this.props;
    if (content === 'acceptanceLikelihood') {
      return 'The probability that a maintainor will accept a submission';
    }
    if (content === 'submissionFreq') {
      return 'How frequently submissions are made in a set time frame';
    }
    if (content === 'submissionFreq') {
      return 'How frequently submissions are made in a set time frame';
    }
    if (content === 'submissionQuality') {
      return 'The quality of the submission - i.e. submissions with higher quality are more likely to be accpted';
    }
    if (content === 'minimumDeposit') {
      return 'The minimum amount a contributor must pay to contribute a submission';
    }
    if (content === 'TCRMech') {
      return 'The rules for the TCR';
    }
    if (content === 'curation') {
      return 'Determines if each of the maintainor will have the same voting right i.e one maintainer\'s vote may be of greater importance than another despite having the same amount of tokens';
    }
    if (content === 'access') {
      return 'Indicates if a user has to pay in order to access the list';
    }
    return 'ERROR';
  }

  render() {
    return (
      <div>
        <Tooltip title={this.getDialog()}>
          <i className="material-icons">help</i>
        </Tooltip>
      </div>
    );
  }
}
CustomizedTooltips.propTypes = {
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(CustomizedTooltips);
