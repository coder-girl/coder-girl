/* 
* @Author: Mark Bennett
* @Date:   2015-05-26 14:36:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 12:01:39
*/

'use strict';

var Message = require('../models').Message;
var User = require('../models').User;

module.exports = {
  createMessage: function(req, res, next) {
    var username = req.body.username;
    User.findOne({where: {name: username}})
      .then(function(user) {
        var newMessage = {
          text: req.body.text,
          roomName: req.body.roomName,
          UserId: user.id,
          authorName: user.name
        };
        Message.build(newMessage)
          .save()
          .then(function(message) {
            res.status(200).send(message);
          })
      })
      .catch(function(error) {
        res.status(400).send(error);
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