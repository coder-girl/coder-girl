var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../dist/'));
  //require('../code/codeRoutes.js')(app);
};
