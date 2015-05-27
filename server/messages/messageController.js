/* 
* @Author: Mark Bennett
* @Date:   2015-05-26 14:36:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 17:20:36
*/

'use strict';

var Message = require('../models').Message;
var User = require('../models').User;

module.exports = {
  createMessage: function(req, res, next) {
    var username = req.body.authorName;
    var newMessage = req.body;

    Message.build(newMessage)
      .save()
      .then(function(message) {
        User.findOne({where: {name: username}})
          .then(function(user) {
            if (user) {
              user.addMessage(message);
              res.status(200).send();
            } else {
              console.error("Could not locate user in the database");
            }
          });
      })
      .catch(function(error) {
        res.status(400).send(error);
      });
  },

  getMessages: function(req, res, next) {
    Messages.findAll()
      .then(function(messages) {
        if (messages) {
          res.send(messages);
        } else {
          console.error("Unable to find messages");
        }
      })
      .catch(function(error) {
        res.status(400).send(error);
      })
  }
}