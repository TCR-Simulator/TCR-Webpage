import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FullWidthTabs from './Tab';
import RegistriesMenu from './RegistriesMenu';
import { getAllTcrs } from './api/TcrUtils';

const styles = {
  settings: {
  },
};

class SettingsFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tcrs: [],
    };
  }

  componentDidMount() {
    getAllTcrs().then(tcrs => this.setState({ tcrs }));
  }

  render() {
    const { className } = this.props;
    const { tcrs } = this.state;
    return (
      <div>
        <div>
          <Grid container justify="left" spacing={24}>
            <RegistriesMenu />
          </Grid>
        </div>
        <div id="settings" className={className}>
          <Grid container justify="center">
            <FullWidthTabs tcr={tcrs[0]} />
          </Grid>
        </div>
      </div>
    );
  }
}

SettingsFrame.propTypes = {
  className: PropTypes.string, // eslint-disable-line react/forbid-prop-types
};

SettingsFrame.defaultProps = {
  className: null,
};

export default withStyles(styles)(SettingsFrame);
