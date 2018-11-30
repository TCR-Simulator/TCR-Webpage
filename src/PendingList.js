import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ChallengeBox from './ChallengeBox';
import ListingItem from './api/ListingItem';
import TcrConnection from './api/TcrConnection';

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

class PendingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      items: ['Love Yourself - BTS', 'Fancy - Iggy Azalea', 'Baby - Justin Bieber'],
      openChallenge: false,
    };
  }

  getChallengeButton(listing) {
    const { classes } = this.props;
    return (
      <Button
        variant="outlined"
        color="secondary"
        className={classes.challengebutton}
        onClick={this.handleClick(listing)}
      >
            Challenge
      </Button>
    );
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

  handleClick = listing => () => {
    this.setState({ openChallenge: true, selectedListing: listing });
  }

  handleCancel() {
    this.setState({ openChallenge: false });
  }

  async addItem(event) {
    const { items: currentItems } = this.state;
    const { tcrConnection } = this.props;
    const nameTextbox = event.target.previousElementSibling;
    const urlTextbox = nameTextbox.previousElementSibling;

    if (urlTextbox.value) {
      await tcrConnection.submit(
        100,
        new ListingItem(nameTextbox.value, urlTextbox.value),
      );
      // TODO: change this to actual listing with more info
      currentItems.push(new ListingItem(nameTextbox.value, urlTextbox.value));
      urlTextbox.value = '';
      nameTextbox.value = '';

      this.setState({
        items: currentItems,
      });
    }
  }

  render() {
    const { classes, tcrConnection, listItems } = this.props;
    const { openChallenge, selectedListing } = this.state;

    return (
      <div className={classes.root}>
        <List>
          {listItems.map(listing => (
            <ListItem key={listing.listingHash} dense button>
              <Avatar className={classes.avatar}>
                <i className="material-icons md-10">hourglass_empty</i>
              </Avatar>
              <ListItemText primary={`${listing.name} (${listing.url})`} />
              <ListItemSecondaryAction>
                <div align="right">
                  {this.getChallengeButton(listing)}
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
        <ChallengeBox
          open={openChallenge}
          tcrConnection={tcrConnection}
          listing={selectedListing}
          handleCancel={() => this.handleCancel()}
        />
      </div>
    );
  }
}


PendingList.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tcrConnection: PropTypes.instanceOf(TcrConnection).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.instanceOf(ListingItem)),
};

PendingList.defaultProps = {
  listItems: [],
};

export default withStyles(styles)(PendingList);
