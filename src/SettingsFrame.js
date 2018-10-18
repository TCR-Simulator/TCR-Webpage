import React from 'react';
import PropTypes from 'prop-types';
import TcrBar from './TcrBar';

const SettingsFrame = (props) => {
  const { className } = props;
  return (
    <div id="settings" className={className}>
      <TcrBar />
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
