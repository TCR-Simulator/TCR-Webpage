import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  root: {
    padding: 8 * 3,
    marginleft: 'auto',
    marginright: 'auto',
  },
  dashboard: {
    width: '100%%',
    height: '10cm',
    backgroundColor: '#f2f6f7',
  },
};


class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      acceptedElements: [],
      rejectedElements: [],
      pendingElements: [],
    };
  }

  /* TODO: Implement a fetch function to get data for lists */

  getTabContent() {
    const { value } = this.state;

    if (value === 0) {
      //     return 'Accepted Tab';
      return (
        <div>
          <ul>
            {this.state.acceptedElements.map(listElem => <li>{listElem}</li>)}
          </ul>
        </div>
      );
    }
    if (value === 1) {
      // return 'Rejected Tab';
      return (
        <div>
          <ul>
            {this.state.rejectedElements.map(listElem => <li>{listElem}</li>)}
          </ul>
        </div>
      );
    }
    // return 'Pending Tab';
    return (
      <div>
        <ul>
          {this.state.pendingElements.map(listElem => <li>{listElem}</li>)}
        </ul>
      </div>
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.dashboard}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={this.handleChange}
            >
              <Tab label="Accepted" />
              <Tab label="Rejected" />
              <Tab label="Pending" />
            </Tabs>
          </AppBar>
          <TabContainer>{this.getTabContent()}</TabContainer>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/* eslint-enable react/no-unused-prop-types */
export default withStyles(styles)(UserDashboard);
