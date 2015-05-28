/* 
* @Author: nimi
* @Date:   2015-05-25 10:55:12
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-27 18:59:20
*/

var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');

module.exports = function(app, express, passport) {
  var userRouter = express.Router();
  var messageRouter = express.Router();
  var codeChallengeRouter = express.Router();

  app.use('/api/users', userRouter);
  app.use('/auth', userRouter);
  app.use('/api/messages', messageRouter);
  app.use('/api/challenges', codeChallengeRouter);

  require('../users/passportConfig.js')(passport);
  require('../users/userRoutes.js')(userRouter);
  require('../messages/messageRoutes.js')(messageRouter);
  require('../challenges/codeChallengeRoutes.js')(codeChallengeRouter)
};

