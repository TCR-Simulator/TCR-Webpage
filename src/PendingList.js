import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
  challengebutton: {
    margin: theme.spacing.unit,
    backgroundColor: '#FFF',
    '&:hover': {
      variant: 'cotained',
      color: '#FFF',
      backgroundColor: '#F00',
    },
  },
  applybutton: {
    margin: theme.spacing.unit,
    backgroundColor: '#FFF',
    '&:hover': {
      variant: 'cotained',
      color: '#FFF',
      backgroundColor: '#CCC',
    },
  },
  input: {
    display: 'none',
  },
  avatar: {
    margin: 10,
    width: 25,
    height: 25,
  },
  updateButton: {
    margin: theme.spacing.unit,
    backgroundColor: '#FFF',
    '&:hover': {
      variant: 'contained',
      color: '#FFF',
      backgroundColor: '#195',
    },
  },
});

class PendingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      items: ['Love Yourself - BTS', 'Fancy - Iggy Azalea', 'Baby - Justin Bieber'],
    };
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  addItem(event) {
    const { items: currentItems } = this.state;
    const { tcrConnection } = this.props;
    const nameTextbox = event.target.previousElementSibling;
    const urlTextbox = nameTextbox.previousElementSibling;

    if (urlTextbox.value) {
      tcrConnection.submit(100, nameTextbox.value, urlTextbox.value);
      currentItems.push(nameTextbox.value);
      urlTextbox.value = '';
      nameTextbox.value = '';

      this.setState({
        items: currentItems,
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.state.items.map(value => ( // eslint-disable-line react/destructuring-assignment
            <ListItem key={value} dense button>
              <Avatar className={classes.avatar}>
                <i className="material-icons md-10">hourglass_empty</i>
              </Avatar>
              <ListItemText primary={`${value}`} />
              <ListItemSecondaryAction>
                <div align="right">
                  <Button variant="outlined" color="default" className={classes.updateButton}>
                    Update
                  </Button>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <nav className="nav-add">
          <input type="text" id="urlinput" placeholder="URL" />
          <input type="text" id="nameinput" placeholder="Name" />
          <button type="submit" id="new-item" onClick={this.addItem.bind(this)}>
          Apply
          </button>
        </nav>
      </div>
    );
  }
}


PendingList.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tcrConnection: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(PendingList);
