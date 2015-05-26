/* 
* @Author: nimi
* @Date:   2015-05-26 11:49:57
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 11:53:47
*/

'use strict';

var morgan = require ('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json());

  var testRouter = express.Router();

  app.use('/api/tests', testRouter);

  require('../tests/testRoutes.js')(testRouter);

};
