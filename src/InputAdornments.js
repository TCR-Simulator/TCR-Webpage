import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: -85,
    marginTop: -22,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 1.5,
  },
  textField: {
    flexBasis: 100,
  },
});

class InputAdornments extends React.Component {
  handleChange = prop => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl
          className={classNames(classes.withoutLabel, classes.textField)}
        >
          <Input
            id="min-deposit"
            onChange={this.handleChange('minDeposit')}
            endAdornment={<InputAdornment position="end">Wei</InputAdornment>}
            inputProps={{
              'aria-label': 'MinDeposit',
            }}
          />
        </FormControl>
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(InputAdornments);
