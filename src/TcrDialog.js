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
import grey from '@material-ui/core/colors/grey';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornments from './InputAdornments';


const styles = theme => ({
  subtitle: {
    display: 'inline',
    paddingLeft: 6,
    marginTop: 1,
    position: 'absolute',
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
    borderBottom: '1px solid rgb(0,0,0,.25)',
  },
});


const TcrDialog = (props) => {
  const { classes, open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.dialogBox}
      fullWidth
    >
      <DialogTitle id="form-dialog-title">TCR Mechanism</DialogTitle>
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
            </ListItemText>
            <div>
              <InputAdornments />
            </div>
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
            </ListItemText>
            <Checkbox
              checked="true"
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
          <ListItem className={classes.ListItem}>
            <ListItemText className={classes.listItemText}>
             Consumer pays to subscribe to the list.
            </ListItemText>
            <Checkbox />
          </ListItem>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TcrDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  classes: PropTypes.isRequired,
};

TcrDialog.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default withStyles(styles)(TcrDialog);
