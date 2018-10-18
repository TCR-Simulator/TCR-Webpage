import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  tcrBar: {
    padding: '10px 20px',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class TcrBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipData: [],
    };
    for (var i = 0; i < 3; i++) {
      this.state.chipData.push({});
    }
  }

  handleDelete(data) {
    return () => {
      this.setState(state => {
        const chipData = [...state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        return { chipData };
      });
    }
  };

  handleClick(data) {
    console.log('hello');
  }

  handleAddClick() {
    return () => {
      this.setState(state => {
        const chipData = [...state.chipData];
        chipData.push({});
        return { chipData };
      });
    }
  }

  render() {
    const { classes} = this.props;
    return (
      <Paper elevation={1} square={true} className={classes.tcrBar}>
        <Typography variant="h6" component="h2" color='secondary'>
          TCR Mechanisms
        </Typography>
        {this.state.chipData.map((data, i) => {
          return (
            <Chip
              key={i}
              label={'TCR' + (i + 1)}
              onDelete={this.handleDelete(data)}
              onClick={this.handleClick(data)}
              className={classes.chip}
              color="primary"
              variant="outlined"
            />
          );
        })}
        <Chip
          label="+"
          className={classes.chip}
          onClick={this.handleAddClick()}
          color="primary"
        />
      </Paper>
    );
  }
}

TcrBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TcrBar);
