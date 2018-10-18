import React from 'react';
import PropTypes from 'prop-types'; import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from 'react-rangeslider';
import Checkbox from '@material-ui/core/Checkbox';

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

const agents = [
  {
    type: 'maintainer',
    population: 1,
    behaviors: {
      ignore_quality: false,
      acceptance_likelihood: 0.5,
    },
  },
  {
    type: 'contributor',
    population: 20,
    behaviors: {
      quality_scale: 0.7,
      frequency: 15,
    },
  },
  {
    type: 'user',
    population: 50,
    behaviors: {
      payment_likelihood: 0.1,
    },
  },
];


class BaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: '',
      pop: '',
    };
  }

  handleChange = name => event => {
    this.setState ({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, renderInputs } = this.props;
    const { agent, pop } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography>
            {agent}
          </Typography>
          <form className = {classes.container} noValidate autoComplete="off">
              <TextField
                id = "standard_number"
                label = "Number"
                value = {this.state.pop}
                onChange = {this.handleChange('pop')}
                type = "number"
                className = {classes.textField}
                InputLabelProps = { {
                  shrink: true,
                }}
                margin = "normal"
              />
              {renderInputs().map((input) => input)}
          </form>
        </CardContent>
      </Card>
    );
  }
}

class MaintainerCard extends BaseCard { 
  constructor (props) { 
    super(props);
    this.state = {
      ...this.state,
      agent: 'Maintainer',
      ignore_quality: false,
      acceptance_likelihood: 50,
    };
    this.props = {
      ...this.props,
      renderInputs: this.renderMaintainerInputs.bind(this),
    }
  }
   handleChangeQuality = name => event => { 
    this.setState ({[name]: event.target.checked});
  };

  handleChangeSlider = (event, value) => {
    this.setState({value});
  };

  renderMaintainerInputs = () => {
    
    const { ignore_quality } = this.state;
    return [
      <Checkbox
        checked = {ignore_quality}
        onChange = {this.handleChangeQuality('ignore_quality')}
        value = "ignore_quality"
      />,
      <Slider
        min = {0}
        max = {100}
        value = "acceptance_likelihood"
        onChange = {this.handleChangeSlider}
      />,
    ]
  };
}

BaseCard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  renderInputs: PropTypes.func.isRequired,
};

BaseCard.defaultProps = {
  renderInputs: () => [],
}

export default withStyles(styles)(BaseCard);
