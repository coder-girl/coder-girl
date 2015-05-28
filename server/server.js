/* 
* @Author: nimi
* @Date:   2015-05-25 10:32:38
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-27 14:55:02
*/
var express = require('express');
var app = express();
var models  = require('./models');
var passport = require('passport');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var http = require('http').Server(app);

// var io = require('socket.io').(http);

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist/'));

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express, passport);

app.set('port', (process.env.PORT || 3000));

// initialize socket communication 
// var peopleOnline = 0;
// io.on('connection', function(socket) {
//     peopleOnline++;
//     io.emit('user connected', peopleOnline);

//     socket.on('chat message', function(msgInfo) {
//         // Send that message to everyone.
//         io.emit('chat message', msgInfo);
        
//         // Insert that message to database
//         db.insertMessage(msgInfo.room_name, msgInfo.username, msgInfo.msg, msgInfo.unix_time, function(err) {
//             if (err) {
//                 console.log('Error while inserting message into db: ' + err);
//             }
//         });
//     });

//     socket.on('disconnect', function() {
//         peopleOnline--;
//         io.emit('user disconnected', peopleOnline);
//     });
// });

models.sequelize.sync()  //Include {force: true} as argument in sync() if want DB to drop on server restart.

.done(function(){
  app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
  });

})

// export for testing and flexibility
module.exports = app;
