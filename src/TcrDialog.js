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
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import InputAdornments from './InputAdornments';
import CustomizedTooltips from './InformationButton';
import { createTcr } from './api/BackendAPI';

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
    enablePayment: true,
    subsFeeColor: 'grey',
    loading: false,
    snackbarOpen: false,
    snackbarMessage: '',
  };

  handleChange = name => (event) => {
    const newParam = { [name]: event.target.value };
    this.setState((state) => {
      const parameters = Object.assign({}, state.parameters, newParam);
      return { parameters };
    });
  };

  handleCreate = () => async () => {
    const { handleCreate } = this.props;
    const { parameters } = this.state;
    this.setState({ loading: true });
    try {
      const newTcr = await createTcr('Temp name', parameters || {});
      handleCreate(newTcr);
    } catch (e) {
      console.log(e);
      this.setState({ snackbarOpen: true, snackbarMessage: e.toString() });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSnackbarClose = () => () => {
    this.setState({ snackbarOpen: false });
  }

  handleCheck(enablePayment) {
    return () => {
      this.setState({ enablePayment: enablePayment === false,
        subsFeeColor: enablePayment ? '#212121' : 'grey' });
    };
  }

  render() {
    const { classes, open, handleCancel } = this.props;
    const { enablePayment, subsFeeColor, loading, snackbarOpen, snackbarMessage } = this.state;

    return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        className={classes.dialogBox}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
         TCR Mechanism
        </DialogTitle>
        <DialogContent>
          <div>
            <div className={classes.section}>
              <AssignmentIcon className={classes.subtitleIcon} />
              <Typography variant="subtitle1" className={classes.subtitle}>
                Submission
              </Typography>
            </div>
            <ListItem className={classes.ListItem}>
              <ListItemText className={classes.listItemText}>
                Minimum Deposit
                <CustomizedTooltips classes="" content="minimumDeposit" />
              </ListItemText>
              <div>
                <InputAdornments unit="wei" onChange={this.handleChange('minDeposit')} />
              </div>
            </ListItem>
            <ListItem className={classes.withSection}>
              <ListItemText className={classes.listItemText}>
                Submission Length Period
                <CustomizedTooltips classes="" content="" />
              </ListItemText>
              <div>
                <InputAdornments unit="day(s)" onChange={this.handleChange('applyStageLen')} />
              </div>
            </ListItem>
            <ListItem className={classes.ListItem}>
              <ListItemText className={classes.listItemText}>
                Submission could be challenged.
                <CustomizedTooltips classes="" content="" />
              </ListItemText>
              <Checkbox />
            </ListItem>
          </div>
          <div>
            <div className={classes.section}>
              <AssignmentTurnedInIcon className={classes.subtitleIcon} />
              <Typography variant="subtitle1" className={classes.subtitle}>
                Curation
              </Typography>
            </div>
            <ListItem className={classes.ListItem}>
              <ListItemText className={classes.listItemText}>
                Each maintainer holds equal voting rights.
                <CustomizedTooltips classes="" content="curation" />
              </ListItemText>
              <Checkbox
                defaultChecked
              />
            </ListItem>
          </div>
          <div>
            <div className={classes.section}>
              <PageviewIcon className={classes.subtitleIcon} />
              <Typography variant="subtitle1" className={classes.subtitle}>
               Subscription
              </Typography>
            </div>
            <ListItem className={classes.withSection}>
              <ListItemText className={classes.listItemText}>
                Consumer pays to subscribe to the list.
                <CustomizedTooltips classes="" content="access" />
              </ListItemText>
              <Checkbox onChange={this.handleCheck(enablePayment)} />
            </ListItem>
            <ListItem className={classes.withSection}>
              <ListItemText
                disableTypography
                primary={(
                  <Typography
                    variant="subtitle1"
                    style={{ color: subsFeeColor, marginLeft: 10 }}
                  >
                    Subscription Fee
                  </Typography>)}
              />
              <InputAdornments unit="wei" disabled={enablePayment} />
            </ListItem>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" disabled={loading}>
            Cancel
          </Button>
          <div className={classes.submitWrapper}>
            <Button
              onClick={this.handleCreate()}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Create
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
};

TcrDialog.defaultProps = {
  open: false,
  handleCancel: () => {},
  handleCreate: () => {},
};

export default withStyles(styles)(TcrDialog);
