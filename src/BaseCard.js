import React from 'react';
import PropTypes from 'prop-types'; import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const BaseCard = (props) => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        Card Content
      </CardContent>

      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

BaseCard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(BaseCard);
