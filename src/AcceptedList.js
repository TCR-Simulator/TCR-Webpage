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

class AcceptedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      items: ['Blank Space - Taylor Swift', 
              'New Rules - Dua Lipa',
              'There is nothing holding me back - Shawn Mendes'],
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
        <List id="AcceptedList">
          {this.state.items.map(value => (
            <ListItem key={value} dense button>
              <img src="image/done.png" />
              <ListItemText primary={`${value}`} />
              <ListItemSecondaryAction>
                <div align="right">
                  <Button variant="outlined" color="secondary" className={classes.challengebutton} onClick={this.addItem.bind(this)}>
                    Challenge
                  </Button>
                  <Button variant="outlined" color="default" className={classes.applybutton}>
                    Withdraw
                  </Button>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}


AcceptedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AcceptedList);
