import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ListingItem from './api/ListingItem';
import TcrConnection from './api/TcrConnection';

const styles = theme => ({
  updateButton: {
    margin: theme.spacing.unit,
    backgroundColor: '#FFF',
    '&:hover': {
      variant: 'contained',
      color: '#FFF',
      backgroundColor: '#195',
    },
  },
}) 

class UpdateStatus extends React.Component {
  
  handleUpdateStatus = () => {
    const { tcrConnection, listing } = this.props;
    tcrConnection.updateStatus(listing.listingHash);
  }

  render() {
    const { classes, tcrConnection, listing } = this.props;

    return (
    <Button 
    variant="outlined" 
    color="default" 
    className={classes.updateButton}
    onClick={this.handleUppdateStatus}
    >
    Update Status
    </Button>
    )
  }
}

UpdateStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  listing: PropTypes.instanceOf(ListingItem),
};

UpdateStatus.defaultProps = {
  listing: [],
}

export default withStyles(styles)(UpdateStatus);
