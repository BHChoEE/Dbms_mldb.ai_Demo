import React from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Grid, Icon, withStyles} from '@material-ui/core';

const styles = theme => ({
    input: {
        width: '100%',
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class UserInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            param: ""
        }
    }
    handleInput = e => {this.setState({param: e.target.value});};
    sendMessage = e => {
        e.preventDefault();
        var param = this.state.param;
        if (param === 0) {return;}
        var re = RegExp('^[0-9]+$');
        if(param.match(re) === null) {
            window.alert('Username must contain only English or number!!');
            this.setState({
                param: ""
            });
            return;
        } else {
            this.props.sendMsgCallBack(param);
            this.setState({param: ""});
        }
    }
    handleKeyPress(e) {
        if (e.key === 'Enter')
        this.sendMessage(e);
    }
    render(){
        const {classes} = this.props;
        if(this.props.pickFriendBoolean === false)
            return null;
        return (
            <Grid container className={classes.root} spacing={24}>
            <Grid item sm={11}>
            <Input placeholder="Enter Your parameter..." className={classes.input} value={this.state.param}
            onChange={e => this.handleInput(e)} onKeyPress={e => this.handleKeyPress(e)} inputProps={{'aria-label': 'Description',}}/>
            </Grid>
            <Grid item sm={1}>
            <Button 
                className={classes.button} variant="outlined" onClick={e => this.sendMessage(e)} color="primary"> Send
                {/* <Icon className={classes.rightIcon}>send</Icon> */}
            </Button>
            </Grid>
            </Grid>
        );
    };
}

UserInput.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(UserInput);