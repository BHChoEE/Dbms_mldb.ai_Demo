import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import io from 'socket.io-client';

const styles = {
  card: {
    maxWidth: 690,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  grid: {
    alignContent: 'center',
    alignItems: 'center'
  }
};

class SimpleMediaCard extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    const { classes } = this.props;
    
    return (
      <div>
      {/* <Grid item xs = {12} className = {classes.grid}> */}
          <img src = {this.props.url} class = 'center'/>
      {/* </Grid> */}
      </div>
    );
  }
}
SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
