import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const TcrDialog = (props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">TCR Mechanism</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Some description...
        </DialogContentText>
        <TextField
          id="name"
          label="Example input"
          fullWidth
        />
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
};

TcrDialog.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default TcrDialog;
