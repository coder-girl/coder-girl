var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');

module.exports = function(app, express, passport) {

  var userRouter = express.Router();
  var messageRouter = express.Router();

  app.use('/api/users', userRouter);
  app.use('/auth', userRouter);
  app.use('/api/messages', messageRouter);

  require('../users/passportConfig.js')(passport);
  require('../users/userRoutes.js')(userRouter);
  require('../messages/messageRoutes.js')(messageRouter);

};

