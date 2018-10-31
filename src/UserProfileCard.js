import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

const styles = {
	card: {
	  maxWidth: '40%',
	},
  row: {
    display: 'flex',
    //justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    margin: 10,
  },
	details: {
	  margin: '10px',
    
	}
 };


class UserProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			accountID: 8349573,
			balance: 9.765,
			userName: 'John Doe',
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
		    <CardContent>
		     <div className={classes.row}>
					 <Avatar
					   src={require('./user_profile.png')}
					   className={classes.avatar}
					 />
					 <div className={classes.details}>
		         <Typography variant="h6" component="h2">
					     {this.state.userName}   
				     </Typography>
					   <Typography className={classes.title} color="textSecondary" gutterBottom> Account ID: {this.state.accountID} </Typography>
		         <Typography className={classes.pos} color="textSecondary"> Account Balance: {this.state.balance} </Typography>
				   </div>
				 </div>
		    </CardContent>
		    <CardActions>
		      <Button size="small">
					  Edit Profile
					  <Icon>edit_icon</Icon>
					</Button>
		    </CardActions>
			</Card>
	  );
  }
}

/* eslint-disable react/no-unused-prop-types */
UserProfileCard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/* eslint-enable react/no-unused-prop-types */
export default withStyles(styles)(UserProfileCard);
