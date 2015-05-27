/* 
* @Author: Mark Bennett
* @Date:   2015-05-26 14:36:43
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 16:45:21
*/

'use strict';

var messageController = require('./messageController');

module.exports = function(app) {
  app.get('/', messageController.getMessages);
  app.post('/create', messageController.createMessage);
}
