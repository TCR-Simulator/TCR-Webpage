import React from 'react';
import PropTypes from 'prop-types';
import TcrBar from './TcrBar';
import BaseCard from './BaseCard';
import MaintainerCard from './BaseCard';

const SettingsFrame = (props) => {
  const { className } = props;
  return (
    <div id="parent" className={className}>
      <div id="settings" className={className}>
        <TcrBar />
      </div>
      
      <div id="maintainer" className={className}>
        <MaintainerCard />
      </div>
    </div>
  );
};

SettingsFrame.propTypes = {
  className: PropTypes.string,
};

SettingsFrame.defaultProps = {
  className: null,
};

export default SettingsFrame;
