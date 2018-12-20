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
    const { tcrConnection, onApplySuccess } = this.props;
    const artistTextbox = event.target.previousElementSibling;
    const nameTextbox = artistTextbox.previousElementSibling;
    const urlTextbox = nameTextbox.previousElementSibling;

    if (nameTextbox.value) {
      const listing = new ListingItem(nameTextbox.value, artistTextbox.value, urlTextbox.value);
      await tcrConnection.submit(100, listing);
      urlTextbox.value = '';
      nameTextbox.value = '';
      artistTextbox.value = '';

      onApplySuccess(listing);
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
              <ListItemText primary={`${listing.name} - ${listing.artist} (${listing.url})`} />
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
          <input type="text" id="artistinput" placeholder="Artist" />
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
  onApplySuccess: PropTypes.func,
};

PendingList.defaultProps = {
  listItems: [],
  onApplySuccess: () => {},
};

export default withStyles(styles)(PendingList);
