import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { getToken } from '../config';
import TokenService from '../api/TokenService';

export default class TokenBalance extends React.Component {
  state = {
    balance: 0,
  }

  componentDidMount = async () => {
    const { tokenService } = this.props;
    const balance = await tokenService.currentAccountBalance();
	const self = this;
	var transferEvent = getToken.Transfer();
    transferEvent.watch(function(error, result) {
      if (!error) {
        self.setState({ balance });
      } else
        console.log(error);
    });
  }

  onClick = () => async () => {
    const { tokenService } = this.props;
    await tokenService.sendToken(500);
  }

  render() {
    const { balance } = this.state;
    // console.log(await tokenService.currentAccountBalance());
    return (
		<Typography variant="h6" color="inherit">
            Balance = {balance.toString()}
        </Typography>
    );
  }
}

TokenBalance.propTypes = {
  tokenService: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};