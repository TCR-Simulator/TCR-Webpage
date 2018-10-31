import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      checked: [],
      items: ['Stuff'],
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
              <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" />
              <ListItemText primary={`${value}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <nav className="nav-add">
          <ContributionBox/>
        </nav>
      </div>
    );
  }
}


CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
