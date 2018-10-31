import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListAltIcon from '@material-ui/icons/ListAlt';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  button: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTcr: null,
      tcrs: ['Users pay', 'Peaceful', 'IDK'],
    };
  }

  onTCRSelected(selectedIndex) {
    this.setState({ selectedTcr: selectedIndex });
  }

  render() {
    const { classes } = this.props;
    const { selectedTcr, tcrs } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              TCR Playground
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List subheader={<ListSubheader component="div">Deployed TCRs</ListSubheader>}>
            {tcrs.map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => this.onTCRSelected(index)}
                selected={selectedTcr === index}
              >
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" className={classes.button}>
            Create new TCR
          </Button>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h6">TCR</Typography>
          <Typography variant="h5">{tcrs[selectedTcr]}</Typography>
        </main>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Admin);
