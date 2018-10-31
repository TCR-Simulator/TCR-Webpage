import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

function ParametersCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>Parameters</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parameter</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={1}>
              <TableCell component="th" scope="row">Parameter #1</TableCell>
              <TableCell numeric>0.123</TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell component="th" scope="row">Parameter #2</TableCell>
              <TableCell numeric>0.321</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

ParametersCard.propTypes = {
  tcr: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ParametersCard;
