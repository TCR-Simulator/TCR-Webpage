import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import InChallenge from '@material-ui/icons/Autorenew';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import CommitVoteDialog from './CommitVoteDialog';
import RevealVoteDialog from './RevealVoteDialog';
import ListingItem from './api/ListingItem';
import TcrConnection from './api/TcrConnection';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
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
      selectedItem: null,
      commitVoteDialogOpened: false,
      revealVoteDialogOpened: false,
    };
  }

  onCommitBtnClick = item => () => {
    this.setState({ selectedItem: item, commitVoteDialogOpened: true });
  }

  onRevealBtnClick = item => () => {
    this.setState({ selectedItem: item, revealVoteDialogOpened: true });
  }

  handleCommit = () => () => {
    this.setState({ commitVoteDialogOpened: false });
  }

  handleReveal = () => () => {
    this.setState({ revealVoteDialogOpened: false });
  }

  handleCancel = () => () => {
    this.setState({ commitVoteDialogOpened: false, revealVoteDialogOpened: false });
  }

  render() {
    const { classes, listings, tcrConnection } = this.props;
    const { commitVoteDialogOpened, revealVoteDialogOpened, selectedItem } = this.state;

    return (
      <div className={classes.root}>
        <List>
          {listings.map(item => (
            <ListItem key={item.listingHash} dense button>
              <Avatar className={classes.avatar}>
                <InChallenge />
              </Avatar>
              <ListItemText primary={`${item.name} - ${item.artist} (${item.url})`} />
              <ListItemSecondaryAction>
                <div align="right">
                  <Button variant="outlined" color="default" onClick={this.onCommitBtnClick(item)}>
                    Commit vote
                  </Button>
                  <Button variant="outlined" color="default" onClick={this.onRevealBtnClick(item)}>
                    Reveal vote
                  </Button>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {selectedItem
          && selectedItem.challengePoll
          && (
            <RevealVoteDialog
              open={revealVoteDialogOpened}
              handleReveal={this.handleReveal()}
              handleCancel={this.handleCancel()}
              poll={selectedItem.challengePoll}
              votingConnection={tcrConnection.voting}
            />
          )
          }
        {selectedItem
          && selectedItem.challengePoll
          && (
            <CommitVoteDialog
              open={commitVoteDialogOpened}
              handleCommit={this.handleCommit()}
              handleCancel={this.handleCancel()}
              poll={selectedItem.challengePoll}
              votingConnection={tcrConnection.voting}
            />
          )
        }
      </div>
    );
  }
}

ChallengeList.propTypes = {
  tcrConnection: PropTypes.instanceOf(TcrConnection).isRequired,
  listings: PropTypes.arrayOf(PropTypes.instanceOf(ListingItem)),
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

ChallengeList.defaultProps = {
  listings: [],
};

export default withStyles(styles)(ChallengeList);
