import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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
      variant: "cotained",
      color: '#FFF',
      backgroundColor: '#F00',
    }
  },
  applybutton: {
    margin: theme.spacing.unit,
    backgroundColor: '#FFF',
    '&:hover': {
      variant: "cotained",
      color: '#FFF',
      backgroundColor: '#CCC',
    }
  },
  input: {
    display: 'none',
  },
});

class PendingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      items: [],
      deleted: false,
    }
  }

  addItem (event) {
    let currentItems = this.state.items;
    let textBox = event.target.previousElementSibling;

    if (textBox.value) {
        currentItems.push(textBox.value);
        textBox.value = '';

        this.setState({
          items: currentItems,
        });
    }
  }

  removeItem (event) {
      let currentItem = event.target.textContent;
      let updatedItems = this.state.items.filter((item) => {
        return currentItem !== item;
      });

      this.setState({
        items: updatedItems,
      });

      !this.state.deleted && this.setState({
        deleted: true
      });
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.state.items.map(value => (
            <ListItem key={value} dense button>
              <img src="/image/pending.png" />
              <ListItemText primary={`${value}`} />
              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <nav className="nav-add">
            <input type="text" id="urlinput" placeholder="URL" />
            <input type="text" id="nameinput" placeholder="Name" />
            <button id="new-item"
                        onClick={this.addItem.bind(this)}>Apply</button>
        </nav>
      </div>
    );
  }
}


PendingList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PendingList);
