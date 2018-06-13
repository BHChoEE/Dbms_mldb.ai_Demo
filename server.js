var http = require('http');
var express = require('express');
var socketIo = require('socket.io');
var path = require('path');
var bodyParser = require('body-parser');
var exec = require('child_process').exec, child;
var fs = require('fs');
// setup server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// allow bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname ,'public')));

// render an API index page
app.get(['/', '/index'], function(req, res){
	res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/redirect', function(req, res){
	console.log(req.query.page);
	res.redirect(req.query.page);
});

// send file and image to client
app.get('/url', (req, res) => {
    var param = req.query['param'];
    console.log(param);
    var url = "";
    var prediction = "UNKNOWN";
    var score = "0";
    var urlcmd = 'python2 query.py ' + param;
    child = exec(urlcmd, function (error, stdout, stderr) {
      if (error !== null) {
          console.log('exec error: ' + error);
      }
      else{
        //console.log('stdout: ' + stdout);
        var result = stdout.split('\n');
        
        url = result[0];
        prediction = result[1];
        score = result[2];
      }
      var testSet = {
        url: url,
        prediction: prediction,
        score: score
      };
      res.send(testSet);
    });
})
// app.get('/result', (req, res) => {
//     var prediction = "";
//     var label = "";
//     var resCmd = 'cat ./scripts/prediction.txt';
//     child = exec(resCmd, function(error, stdout, stderr){
//       if(error !== null)
//         console.log('exec error: ' + error);
//       else{
//         console.log(stdout);

//       }
//       var testSet = {
//         label: label,
//         prediction: prediction
//       };
//       res.send(testSet);
//     })
// })
// Start listening
server.listen(3000);
console.log(`Started on port 3000`);
io.on('connection', socket => {
    socket.on('param', (param, cb) => {            
        cb('[ack] server received: ' + param);
        console.log(param);
        var cmd = 'python2 data_gen.py ' + param;
        child = exec('ls', function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          if (error !== null) {
             console.log('exec error: ' + error);
          }
          fs.readFile(__dirname + '/assets/login.jpg', function(err, buf){
            socket.emit('image', { image: true, buffer: buf.toString('base64') });
            console.log('image file is initialized');
          });
        });
    })
});

