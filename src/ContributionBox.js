import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  nameinput: {
    margin: theme.spacing.unit,
    width: '20%',
  },
  urlinput: {
    margin: theme.spacing.unit,
    width: '50%',
  },
  applybutton: {
    margin: theme.spacing.unit,
    width: '10%',
    backgroundColor: '#FFF',
    '&:hover': {
      variant: "cotained",
      color: '#FFF',
      backgroundColor: '#09F',
    }
  },
});

class ContributionBox extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Input
          placeholder="Name"
          className={classes.nameinput}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="URL"
          className={classes.urlinput}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Button variant="outlined" color="primary" className={classes.applybutton}>
          Apply
      </Button>
      </div>
    );
  }
}

ContributionBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContributionBox);

