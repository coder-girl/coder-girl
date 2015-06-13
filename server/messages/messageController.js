/* 
* @Author: Mark Bennett
* @Date:   2015-05-26 14:36:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-11 15:09:39
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
    Message.findAll({
      limit: 50,
      order: '"createdAt" DESC',
    })
      .then(function(messages) {
        res.send(messages.reverse());
      })
      .catch(function(error) {
        res.status(400).send(error);
      });
  }
}