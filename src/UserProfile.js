import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UserProfileCard from './UserProfileCard';
import UserDashboard from './UserDashboard';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },

};


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <UserProfileCard />
        <UserDashboard />
      </div>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
UserProfile.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/* eslint-enable react/no-unused-prop-types */
export default withStyles(styles)(UserProfile);
