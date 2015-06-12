/* 
* @Author: nimi
* @Date:   2015-05-25 10:32:38
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-11 18:55:51
*/

var express = require('express'),
    app = express(),
    models  = require('./models'),
    Challenge = models.Challenge,
    passport = require('passport'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    addAllChallenges = require('./challenges/addAllChallenges');
    messageController = require('./messages/messageController');

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

models.sequelize.sync()  //Include {force: true} as argument in sync() if want DB to drop on server restart.
  .then(function(){
    Challenge.bulkCreate([
<<<<<<< HEAD
      // enter challenge objects here
=======
      {
        testCode:1,
        title:"String Theory",
        instructions:"In JavaScript you can put any keyboard characters you want in quotes and you have created a \"string\".The quotes can \
        be single or double quotes but they have to match. A string can be made up of a single letter, a single word or whole paragraphs. The \
        sky is the limit.<br><br><b>Challenge:<b> In the editor, create a string that contains your favorite hashtag for selfies. Note that in the editor, it now \
        says \"//type your string here\". By putting \"//\" before text, it turns the entire line into a comment that is ignored by JavaScript. \
        It allows you to write comments about your code to remind your later self what you did. So, make sure to write your brilliant new string \
        on line 2. Otherwise, if you write it on line 1 it will be ignored.",
        content: "//type your string on the next line",
        pointValue: 100,
        hint1: "Did you place your string in matching quotes (either both single quotes or both double quotes)?",
        hint2: "My answer would be \"#filtersforever\"."
      },

      {
        testCode: 2,
        title: "1+1 Cool 2*2 School",
        content: "// enter code on next line",
        instructions: "Strings are fine and dandy, but sometimes you just need a number. JavaScript has you covered. You can use numbers and do \
        math all within JavaScript. You can add (+), subtract (-), multiply (*) and divide (/). <br><br>Note that if you put a number in quotes, \
        it becomes a string and no longer behaves the way you would expect. For instance if you input `\"2\" + \"5\"` you would get `\"25\"` in \
        return because the two strings would just be smooshed together. This smooshing is called \"concatenation\". If you want to add 2 + 5 to \
        get 7, you leave off the quotes.<br><br>Say you want to use JavaScript to write a text to your friend Caroline but all of your number\
        keys are broken  other than the number 1.<br><br><b>Challenge:<b>In the editor, write out the string \"2cool4school\" but only using\
        the number 1.",
        hint1:"Your number 1 should NOT be in quotes in your code since you want to do regular addition.",
        hint2:"Your answer should be in the form of: `(6 + 6) + 'wordy' + (3 + 3 + 3) + 'more_wordy'`.",
        pointValue:150
      }
>>>>>>> (feat) Add tests 1-9 and review and clean challenges 1 - 9
      ])
  })
  .done(function(){
    server.listen(app.get('port'), function() {
    // app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'));
    })
    .catch(function(error){
      console.error('There was an error with syncing the database: ', error)
    })
  });

// initialize socket communication 
// var peopleOnline = 0;
io.on('connection', function(socket) {
  // peopleOnline++;
  // io.emit('user connected', peopleOnline);

  socket.on('send message', function(message) {
    // Insert that message to database
    messageController.createMessage(message);

    // Send that message to everyone.
    io.emit('new message', message);
  });

  // socket.on('disconnect', function() {
  //   peopleOnline--;
  //   io.emit('user disconnected', peopleOnline);
  // });

});

// export for testing and flexibility
module.exports = app;
