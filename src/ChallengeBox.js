import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PageviewIcon from '@material-ui/icons/Pageview';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import InputAdornments from './InputAdornments';
import CustomizedTooltips from './InformationButton';


const styles = theme => ({
  subtitle: {
    display: 'inline',
    paddingLeft: 6,
    marginTop: 1,
    position: 'flex',
    flexDirection: 'column',
  },
  dialogBox: {
    maxWidth: '80%',
  },
  subtitleIcon: {
    display: 'inline',
    padding: 3,
  },
  listItemText: {
    marginLeft: 10,
  },
  ListItem: {
    marginTop: 10,
    marginBottom: 17,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  section: {
    display: 'flex',
    borderBottom: '1px solid rgb(0,0,0,.25)',
  },
  withSection: {
    display: 'flex',
    marginTop: 10,
    marginBottom: -5,
  },
  selected: {
    color: 'grey',
    marginLeft: 10,
  },
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

class TcrDialog extends React.Component {
  state = {
    description: '',
    loading: false,
    snackbarOpen: false,
    snackbarMessage: '',
    parameters: {
      minDeposit: 100,
      applyStageLen: 7,
      commitStageLen: 7,
      revealStageLen: 7,
      voteQuorum: 50,
      dispensationPct: 100,
    },
    name: 'New TCR',
  };

  handleNameChange = () => (event) => {
    const name = event.target.value;
    this.setState({ name });
  }

  handleChange = name => (event) => {
    const newParam = { [name]: event.target.value };
    this.setState((state) => {
      const parameters = Object.assign({}, state.parameters, newParam);
      return { parameters };
    });
  };

  handleChallengeDescription = () => (event) => {
    const description = event.target.value;
    this.setState({ description });
  }

  handleCreate = () => async () => {
    const { handleCreate } = this.props;
    const { name, parameters } = this.state;
    this.setState({ loading: true });
    try {
      const newTcr = await createTcr(name, parameters || {});
      handleCreate(newTcr);
    } catch (e) {
      this.setState({ snackbarOpen: true, snackbarMessage: e.toString() });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCreateChallenge = () => async () => {
    const { listingId, handleChallenge } = this.props;
    const { description } = this.state;
    this.setState({ loading: true });
    try {
      const newChallenge = await hallenge
    } catch (e) {

    } finally {

    }
  };

  handleSnackbarClose = () => () => {
    this.setState({ snackbarOpen: false });
  }

  render() {
    const { classes, open, handleCancel, listingId } = this.props;
    const {
      description,
      parameters,
      loading,
      snackbarOpen,
      snackbarMessage,
    } = this.state;

    return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        className={classes.dialogBox}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Challenge a Submission
        </DialogTitle>
        <DialogContent>
          <div>
            <div className={classes.section}>
              <AssignmentIcon className={classes.subtitleIcon} />
              <Typography variant="subtitle1" className={classes.subtitle}>
                Reason to Challenge
              </Typography>
            </div>
            <ListItem className={classes.ListItem}>
              <div>
                <TextField
                  value="Type your reason here"
                  margin="normal"
                  onChange={this.handleChallengeDescription()}
                  autoFocus
                />
              </div>
            </ListItem>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" disabled={loading}>
            Cancel
          </Button>
          <div className={classes.submitWrapper}>
            <Button
              onClick={this.handleCreateChallenge()}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Challenge
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

TcrDialog.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleCreate: PropTypes.func,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tcrConnection: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

TcrDialog.defaultProps = {
  open: false,
  handleCancel: () => {},
  handleCreate: () => {},
};

export default withStyles(styles)(TcrDialog);
