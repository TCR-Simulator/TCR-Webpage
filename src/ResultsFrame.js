import React from 'react';
import PropTypes from 'prop-types';

const ResultsFrame = (props) => {
  const { className } = props;
  return (
    <div id="results" className={className}>
      <h1>Results!</h1>
    </div>
  );
};

ResultsFrame.propTypes = {
  className: PropTypes.string,
};

ResultsFrame.defaultProps = {
  className: null,
};

export default ResultsFrame;
