/* 
* @Author: Mark Bennett
* @Date:   2015-05-26 14:36:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 17:47:05
*/

'use strict';

var Message = require('../models').Message;
var User = require('../models').User;

module.exports = {
  createMessage: function(message) {
    var username = message.authorName;
    User.findOne({where: {name: username}})
      .then(function(user) {
        var newMessage = {
          text: message.text,
          roomName: message.roomName,
          UserId: user.id,
          authorName: user.name
        };
        Message.build(newMessage)
          .save()
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  getMessages: function(req, res, next) {
    Message.findAll()
      .then(function(messages) {
        res.send(messages);
      })
      .catch(function(error) {
        res.status(400).send(error);
      });
  }
}