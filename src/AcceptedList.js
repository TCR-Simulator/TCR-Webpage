import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Done from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
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
});

class AcceptedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      items: ['Blank Space - Taylor Swift', 'New Rules - Dua Lipa', 'There is nothing holding me back - Shawn Mendes', 'Dive - Ed Sheeran', 'New Man - Ed Sheeran', 'Work - Rihanna'],
    };
  }

  getChallengeButton() {
    const { classes, type } = this.props;
    if (type !== 'profile') {
      return (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.challengebutton}
        >
            Challenge
        </Button>
      );
    }
    return (<div />);
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
        <List id="AcceptedList">
          {this.state.items.map(value => ( // eslint-disable-line react/destructuring-assignment
            <ListItem key={value} dense button>
              <Avatar className={classes.avatar}>
                <Done />
              </Avatar>
              <ListItemText primary={`${value}`} />
              <ListItemSecondaryAction>
                <div align="right">
                  {this.getChallengeButton()}
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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(AcceptedList);
