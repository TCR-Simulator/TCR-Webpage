import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import InChallenge from '@material-ui/icons/Autorenew';

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

class ChallengeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      items: ['Work - Rihanna'],
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.state.items.map(value => ( // eslint-disable-line react/destructuring-assignment
            <ListItem key={value} dense button>
              <Avatar className={classes.avatar}>
                <InChallenge />
              </Avatar>
              <ListItemText primary={`${value}`} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}


ChallengeList.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(ChallengeList);
