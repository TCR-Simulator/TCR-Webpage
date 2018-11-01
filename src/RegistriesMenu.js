import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 120,
    backgroundColor: theme.palette.background.paper,
  },
});

const op = [
  'TCR - 1',
  'TCR - 2',
  'TCR - 3',
  'TCR - 4',
];

class RegistriesMenu extends React.Component {
  state = {
    anchorEl: null,
    sI: 1,
  };

  handleClickListItem = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ sI: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Registries"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Registries"
              secondary={op[this.state.sI]} // eslint-disable-line react/destructuring-assignment
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {op.map((option, i) => (
            <MenuItem
              key={option}
              selected={i === this.state.sI} // eslint-disable-line react/destructuring-assignment
              onClick={event => this.handleMenuItemClick(event, i)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

RegistriesMenu.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(RegistriesMenu);
