import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import TcrDialog from './TcrDialog';

const styles = theme => ({
  tcrBar: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class TcrBar extends React.Component {
  constructor(props) {
    super(props);
    const chipData = [];
    for (let i = 0; i < 3; i++) {
      chipData.push({
        key: Math.floor(Math.random() * 10000),
      });
    }
    this.state = {
      chipData,
      tcrDialogOpened: true,
    };
  }

  handleDelete(data) {
    return () => {
      this.setState((state) => {
        const chipData = [...state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        return { chipData };
      });
    };
  }

  handleClick(data) { // eslint-disable-line
    return () => {
      alert(`key: ${data.key}`); // eslint-disable-line no-alert
    };
  }

  handleAddClick() {
    return () => {
      this.setState({ tcrDialogOpened: true });
      // this.setState((state) => {
      //   const chipData = [...state.chipData];
      //   chipData.push({
      //     key: Math.floor(Math.random() * 10000),
      //   });
      //   return { chipData };
      // });
    };
  }

  handleTcrDialogClose() {
    return () => {
      this.setState({ tcrDialogOpened: false });
    };
  }

  render() {
    const { classes } = this.props;
    const { chipData, tcrDialogOpened } = this.state;

    return (
      <Paper elevation={1} square className={classes.tcrBar}>
        <Typography variant="h6" component="h2" color="secondary">
          TCR Mechanisms
        </Typography>
        {chipData.map((data, i) => (
          <Chip
            key={data.key}
            label={`TCR${i + 1}`}
            onDelete={this.handleDelete(data)}
            onClick={this.handleClick(data)}
            className={classes.chip}
            color="primary"
            variant="outlined"
          />
        ))}
        <Chip
          label="+"
          className={classes.chip}
          onClick={this.handleAddClick()}
          color="primary"
        />
        <TcrDialog open={tcrDialogOpened} handleClose={this.handleTcrDialogClose()} />
      </Paper>
    );
  }
}

TcrBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(TcrBar);
