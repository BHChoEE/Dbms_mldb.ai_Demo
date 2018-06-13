import React from 'react';
import ReactDOM from 'react-dom';
import UserInput from './userInput';
import SimpleMediaCard from './simpleMediaCard';
import ButtonAppBar from './ButtonAppBar';
import io from 'socket.io-client';
import {Grid, Button} from '@material-ui/core';
import SimpleList from './SimpleList';
import axios from 'axios';
require('./styles/index.css');
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            param: 1,
            score: "",
            prediction: "",
            url: "http://stylus-lang.com/img/octocat.svg"
        };
        this.socket = io();
    }
    componentDidMount(){
        
    }
    sendMsgCallBack = (p) => {
        this.setState({param: p});
        // this.socket.emit('param', parseInt(p, 10), (ack) => {console.log(ack);});
        axios.get('/url', {
            params: {param: p}  
          })
        .then((res) => {
            this.setState({
                url: res['data']['url'],
                prediction: res['data']['prediction'],
                score: res['data']['score']
            }, () => {console.log(this.state.url)})
        })
        .catch(function(error){
              console.log(error)
        })
    }
    // handleClickTest = (e) => {
    //     axios.get('/result', {
            
    //     })
    //     .then((res) => {
    //         this.setState({
    //             prediction: res['data']['prediction'],
    //             label: res['data']['label']
    //         }, () => {console.log(this.state.prediction)})
    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })
    // }
    render(){
        return(
            <div>
                <ButtonAppBar />
                <Grid container spacing={24}>
                    <Grid item xs={12} >
                        <div className = 'input'>
                            <UserInput sendMsgCallBack={this.sendMsgCallBack}/> 
                        </div>
                    </Grid>  
                    <SimpleList 
                            prediction = {this.state.prediction} 
                            score = {this.state.score.substr(0, 6)}> xs=12 </SimpleList>
                    <Grid item xs = {12}>
                        <div className = 'image'>
                            <SimpleMediaCard url={this.state.url}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));