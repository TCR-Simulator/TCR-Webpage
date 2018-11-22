import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import VotingConnection from './api/VotingConnection';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  submitWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  submitButtonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class RevealVoteDialog extends React.Component {
  state = {
    loading: false,
    snackbarOpen: false,
    snackbarMessage: '',
    copiedMessage: '',
    voteOption: null,
    salt: null,
  };

  handleCancel = () => () => {
    const { handleCancel } = this.props;
    this.setState({ voteOption: null, salt: null });
    handleCancel();
  }

  handleReveal = () => async () => {
    const { handleReveal, contractAddress, poll } = this.props;
    const { copiedMessage } = this.state;
    this.setState({ loading: true });
    try {
      const voting = new VotingConnection();
      console.log(copiedMessage);
      await voting.init(contractAddress);
      await voting.revealVote(poll.id, ((JSON.parse(copiedMessage).voteOption).equals("accept")) ? 1 : 0, JSON.parse(copiedMessage).salt);
      // await voting.commitVote(poll.id, Number(tokensToCommit), voteOption, salt);
      handleReveal();
    } catch (e) {
      this.setState({ snackbarOpen: true, snackbarMessage: e.toString() });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCopiedMessage = event => {
    this.setState( { copiedMessage: event.target.value });
  }

  // handleTokensToCommitChange = event => this.setState({ tokensToCommit: event.target.value });

  handleSnackbarClose = () => () => {
    this.setState({ snackbarOpen: false });
  }

  render() {
    const { classes, open, poll } = this.props;
    const {
      loading,
      snackbarOpen,
      snackbarMessage,
      voteOption,
      salt,
      copiedMessage,
    } = this.state;
    const { revealEndDate } = poll;

    return (
      <Dialog
        open={open}
        onClose={this.handleCancel()}
        aria-labelledby="form-dialog-title"
        className={classes.dialogBox}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Reveal Vote
        </DialogTitle>
        <DialogContent>
          <Typography variant="p"><strong>Reveal period ends:</strong></Typography>
          <Typography variant="p" paragraph>{revealEndDate.toString()}</Typography>

        <Typography variant="p"><strong>Your vote option and salt</strong></Typography>
          <textarea
            value={copiedMessage}
            onChange={this.handleCopiedMessage}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel()} color="primary" disabled={loading}>
            Cancel
          </Button>
          <div className={classes.submitWrapper}>
            <Button
              onClick={this.handleReveal()}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Reveal vote
            </Button>
            {loading && <CircularProgress size={24} className={classes.submitButtonProgress} />}
          </div>
        </DialogActions>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={3000}
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={this.handleSnackbarClose()}
        />
      </Dialog>
    );
  }
}

RevealVoteDialog.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleReveal: PropTypes.func,
  poll: PropTypes.shape({
    id: PropTypes.number.isRequired,
    revealEndDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  contractAddress: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

RevealVoteDialog.defaultProps = {
  open: false,
  handleCancel: () => {},
  handleReveal: () => {},
};

export default withStyles(styles)(RevealVoteDialog);
