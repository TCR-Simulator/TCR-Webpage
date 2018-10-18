import React from 'react';
import PropTypes from 'prop-types'; import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
  card: {
    width: '100%',
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
	slider: {
		padding: '22px 0px',
	},
};


class BaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      population: this.props.population ,
		  ignore_quality: true,
			quality_scale: this.props.quality_scale,
		  acceptance_likelihood: this.props.acceptance_likelihood,
			frequency: this.props.frequency,
    };
  }

	handleChange = name => event => {
    this.setState ({
      [name]: event.target.value,
    });
  };
	
	handleChangeQuality = name => event => { 
    this.setState ({[name]: event.target.checked});
  };

  handleChangeFreqSlider = (event, value) => {
	  console.log(value);
    this.setState({frequency: value});
  }; 
 
	handleChangeQualSlider = (event, value) => {
		this.setState({quality_scale: value});
	};
	getBehaviorComponents() {
		const { classes } = this.props;
		const { type, frequency, quality_scale } = this.state;
					console.log('heeeey ' +  type)
		if (type === 'maintainer') { 
		 return(
			<div>			 
			<FormControlLabel
				label="Ignore submission quality"
				control=
							<Checkbox
								label = "Submission Quality"
								checked = {this.state.ignore_quality}
								onChange = {this.handleChangeQuality('ignore_quality')}
								value = "ignore_quality"
							/>
		  />
			<Typography>Frequency</Typography>
      <Slider
			  className={classes.slider}
			  value={frequency}
			  onChange={this.handleChangeFreqSlider}
			  />
		 </div> 
		 );
		} 
		if (type === 'contributor'){
		 return(
			<div>
				<Typography>Frequency</Typography>
				<Slider
					className = {classes.slider}	 
			    value={frequency}
			    onChange={this.handleChangeFreqSlider}
			  />
				<Typography>Quality</Typography>
			  <Slider
				  className = {classes.slider}
			    value={quality_scale}
			    onChange={this.handleChangeQualSlider}
			  />	
			</div>
		 );
		} 
	} 
  
  render() {
    const { classes } = this.props;
    const { type, population } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography>
            {type}
          </Typography>
          <form className = {classes.container} noValidate autoComplete="off">
              <TextField
                id = "standard_number"
                label = "Number"
                value = {this.state.population}
                onChange = {this.handleChange('population')}
                type = "number"
                className = {classes.textField}
                InputLabelProps = { {
                  shrink: true,
                }}
                margin = "normal"
              />
				 {this.getBehaviorComponents()}	
					</form>
        </CardContent>
      </Card>
    );
  }
}



BaseCard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(BaseCard);
