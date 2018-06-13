import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class SimpleList extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>Prediction: {this.props.prediction}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>Score: {this.props.score}</Paper>
                </Grid>
            </Grid>
            </div>
        );
    }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);