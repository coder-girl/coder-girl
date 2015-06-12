/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:33:52
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-12 10:40:43
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var eventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _messages = {};
var _lastAuthor = null;

var MessageStore = objectAssign({}, eventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getLastAuthor: function() {
    return _lastAuthor;
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

MessageStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case AppConstants.CREATE_MESSAGE:
      _messages[action.data.createdAt] = action.data;
      _lastAuthor = action.data.username;
      MessageStore.emitChange();
      break;

    case AppConstants.RECEIVE_MESSAGES:
      _messages = {};
      _messages = action.data;
      MessageStore.emitChange();
      break;

    default: 
      return true;
  }
});

module.exports = MessageStore;
