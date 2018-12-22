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
      items: [{
        listingHash: 'a;lkdfj;kjf',
        title: 'Work',
        artist: 'Rihanna',
        url: 'www.example.com',
        contractAddress: '0x12345',
        poll: {
          id: 0,
          commitEndDate: new Date('December 17, 2018 03:24:00'),
          revealEndDate: new Date('December 20, 2018 03:24:00'),
        },
      }],
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
    const { classes } = this.props;
    const { items, commitVoteDialogOpened, revealVoteDialogOpened, selectedItem } = this.state;

    return (
      <div className={classes.root}>
        <List>
          {items.map(item => (
            <ListItem key={item.listingHash} dense button>
              <Avatar className={classes.avatar}>
                <InChallenge />
              </Avatar>
              <ListItemText primary={`${item.title} - ${item.artist}`} />
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
          && selectedItem.poll
          && (
            <RevealVoteDialog
              open={revealVoteDialogOpened}
              handleReveal={this.handleReveal()}
              handleCancel={this.handleCancel()}
              poll={selectedItem.poll}
            />
          )
          }
        {selectedItem
          && selectedItem.poll
          && (
            <CommitVoteDialog
              open={commitVoteDialogOpened}
              handleCommit={this.handleCommit()}
              handleCancel={this.handleCancel()}
              poll={selectedItem.poll}
            />
          )
        }
      </div>
    );
  }
}

ChallengeList.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(ChallengeList);
