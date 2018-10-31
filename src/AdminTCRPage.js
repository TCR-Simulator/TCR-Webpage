import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function AdminTCRPage(props) {
  const { tcr } = props;

  return (
    <div>
      <Typography variant="h6">TCR</Typography>
      <Typography variant="h5">{tcr.name}</Typography>
    </div>
  );
}

AdminTCRPage.propTypes = {
  tcr: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminTCRPage;
