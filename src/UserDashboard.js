import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};


class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>UserDashBoard</div>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/* eslint-enable react/no-unused-prop-types */
export default withStyles(styles)(UserDashboard);
