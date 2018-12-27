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
import WithdrawBox from './WithdrawBox';
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
      openWithdraw: false,
    };
  }

  getChallengeOrWithdrawButton(listing) {
    const { classes } = this.props;
    if (listing.applicant !== window.web3.eth.defaultAccount) {
      return (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.challengebutton}
          onClick={this.handleChallengeClick(listing)}
        >
              Challenge
        </Button>
      );
    }
    return (
      <Button
        variant="outlined"
        color="secondary"
        className={classes.challengebutton}
        onClick={this.handleWithdrawClick(listing)}
      >
            Withdraw
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

  // CHALLENGE BOX

  handleChallengeClick = listing => () => {
    this.setState({ openChallenge: true, selectedListing: listing });
  }

  handleCancelChallenge = () => () => {
    this.setState({ openChallenge: false });
  }

  handleChallenge = () => (listing) => {
    const { onChallenge } = this.props;
    onChallenge(listing);
    this.setState({ openChallenge: false });
  }

  // WITHDRAW BOX

  handleWithdrawClick = listing => () => {
    this.setState({ openWithdraw: true, selectedListing: listing });
  }

  handleCancelWithdraw = () => () => {
    this.setState({ openWithdraw: false });
  }

  handleWithdraw = () => (listing) => {
    const { onWithdraw } = this.props;
    onWithdraw(listing);
    this.setState({ openWithdraw: false });
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
    const { openChallenge, openWithdraw, selectedListing } = this.state;

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
                  {this.getChallengeOrWithdrawButton(listing)}
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
          handleCancel={this.handleCancelChallenge()}
          handleSuccess={this.handleChallenge()}
        />
        <WithdrawBox
          open={openWithdraw}
          tcrConnection={tcrConnection}
          listing={selectedListing}
          handleCancel={this.handleCancelWithdraw()}
          handleSuccess={this.handleWithdraw()}
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
  onChallenge: PropTypes.func,
  onWithdraw: PropTypes.func,
};

PendingList.defaultProps = {
  listItems: [],
  onApplySuccess: () => {},
  onChallenge: () => {},
  onWithdraw: () => {},
};

export default withStyles(styles)(PendingList);
