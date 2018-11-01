import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

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
});

class PendingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      items: [],
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
    const currentItems = this.state.items; // eslint-disable-line react/destructuring-assignment
    const textBox = event.target.previousElementSibling;

    if (textBox.value) {
      currentItems.push(textBox.value);
      textBox.value = '';

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
              <Avatar alt="Pending" src="/image/pending.png" />
              <ListItemText primary={`${value}`} />
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
};

export default withStyles(styles)(PendingList);
