/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:33:52
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 17:50:24
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var eventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants');
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _messages = {};

var MessageStore = objectAssign({}, eventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getMessages: function() {
    return _messages;
  },

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

});

MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  
  switch(action.actionType) {

    case ChatConstants.CREATE_MESSAGE:
      _messages[payload.action.data.createdAt] = payload.action.data;
      MessageStore.emitChange();
      break;

    case ChatConstants.RECEIVE_MESSAGES:
      _messages = {};
      _messages = payload.action.data;
      MessageStore.emitChange();
      break;

    default: 
      return true;
  }
});

module.exports = MessageStore;