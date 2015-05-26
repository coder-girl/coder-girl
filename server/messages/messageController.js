/* 
* @Author: Mark Bennett
* @Date:   2015-05-26 14:36:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 16:45:23
*/

'use strict';

var Message = require('../models').Message;

module.exports = {
  createMessage: function(req, res, next) {
    var user = req.body.authorName;


  },

  getMessages: function(req, res, next) {
    console.log("GET MESSAGES REQUEST RECEIVED! REQ: ", req);
  }
}