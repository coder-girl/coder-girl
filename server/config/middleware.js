var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');

module.exports = function(app, express, passport) {

  var userRouter = express.Router();

  app.use('/api/users', userRouter);
  app.use('/auth', userRouter);

  require('../users/passportConfig.js')(passport);
  require('../users/userRoutes.js')(userRouter);

};

