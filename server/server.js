var express = require('express');
var models  = require('./models');
var passport = require('passport');
var cors = require('cors');
var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');


var app = express();

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

models.sequelize.sync();
.done(function(){
  app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
  });

})

// export for testing and flexibility
module.exports = app;
