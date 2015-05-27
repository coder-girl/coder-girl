/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:33:52
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 19:56:00
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var eventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants');
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _messages = {};

var createMessageFromRaw = function(rawMessage) {
  return {
    roomId: rawMessage.roomId,
    authorName: rawMessage.authorName,
    date: new Date(rawMessage.timestamp),
    text: rawMessage.text,
    isRead: rawMessage.roomId === currentRoomId
  };
};

var _addMessagesFromRawMessages = function(rawMessages) {
  rawMessages.forEach(function(message) {
    if (!_messages[message.id]) {
      _messages[message.id] = createMessageFromRaw(message, 'main');
    }
  });
};

var _markMessagesInRoomAsRead = function(roomId) {
  for (var id in _messages) {
    if (_messages[id].roomId === roomId) {
      _messages[id].isRead = true;
    }
  }
};

var MessageStore = objectAssign({}, eventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getMessages: function() {
    return _messages;
  },

  getMessageFromId: function(id) {
    return _messages[id];
  },

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getOrderedMessagesForRoom: function(roomId) {
    var roomMessages = [];
    for (var id in messages) {
      if (_messages[id] === roomId) {
        roomMessages.push(_messages[id]);
      }
    }
    roomMessages.sort(function(a, b) {
      if (a.date > b.date) {
        return -1;
      } else if (b.date > a.date) {
        return 1;
      } else {
        return 0;
      }
    });

    return roomMessages;
  }
});

MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  
  switch(action.actionType) {

    case ChatConstants.CREATE_MESSAGE:
      // save message to _messages 
      console.log("PAYLOAD: ", payload);
      _messages[payload.action.data.UserId] = payload.action.data;
      MessageStore.emitChange();
      break;

    default: 
      return true;
  }
});

module.exports = MessageStore;