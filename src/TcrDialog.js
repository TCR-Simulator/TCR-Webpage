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
});

class TcrDialog extends React.Component {
  state = {
    enablePayment: true,
    subsFeeColor: 'grey',
  };

  // handleAdd(tcrBar) {
  //   return () => {
  //     tcrBar.setState((state) => {
  //       const chipData = [...state.chipData];
  //       chipData.push({
  //         key: Math.floor(Math.random() * 10000),
  //       });
  //       return { chipData };
  //     });
  //     tcrBar.setState({ tcrDialogOpened: false });
  //   };
  // }

  handleCheck(enablePayment) {
    return () => {
      this.setState({ enablePayment: enablePayment === false,
        subsFeeColor: enablePayment ? '#212121' : 'grey' });
    };
  }

  render() {
    const { classes, open, handleClose } = this.props;
    const { enablePayment, subsFeeColor } = this.state;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
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
                <InputAdornments unit="wei" />
              </div>
            </ListItem>
            <ListItem className={classes.withSection}>
              <ListItemText className={classes.listItemText}>
                Submission Length Period
                <CustomizedTooltips classes="" content="" />
              </ListItemText>
              <div>
                <InputAdornments unit="day(s)" />
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TcrDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  // tcrBar: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

TcrDialog.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default withStyles(styles)(TcrDialog);
