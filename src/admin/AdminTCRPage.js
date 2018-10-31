import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ParametersCard from './ParametersCard';

function AdminTCRPage(props) {
  const { tcr } = props;

  return (
    <div>
      <Typography variant="h6">TCR</Typography>
      <Typography variant="h5" gutterBottom>{tcr.name}</Typography>

      <Grid container spacing={24}>
        <Grid item xs={6}>
          <ParametersCard />
        </Grid>
        <Grid item xs={6}>
          <ParametersCard />
        </Grid>
      </Grid>
    </div>
  );
}

AdminTCRPage.propTypes = {
  tcr: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminTCRPage;
