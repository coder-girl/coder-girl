/* 
* @Author: nimi
* @Date:   2015-05-22 11:03:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 12:20:03
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';

var _authStore = {
  currentUser: null
};

var setCurrentUser = function(data){
  console.log("DATA: ", data);
  _authStore.currentUser = data;
  var userToken = JSON.stringify(data.token);
  window.localStorage.setItem('io.codergirl', userToken);
};

var clearCurrentUser = function() {
  _authStore.currentUser = null;
  window.localStorage.removeItem('io.codergirl');
  window.location = '/';
};

var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  getUser: function(){
    return _authStore.currentUser;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.LOGIN_USER:
      setCurrentUser(action.data);
      userStore.emitChange();
      break;

    case AppConstants.LOGOUT_USER:
      clearCurrentUser();
      userStore.emitChange();
      break;

    case AppConstants.INSTAGRAM_SET_CURRENT_USER:
      setCurrentUser(action.data);
      userStore.emitChange();
      break;
    case AppConstants.SIGNUP_USER:
      setCurrentUser(action.data);
      userStore.emitChange();
      break;
    default:
      return true;
  }
});

module.exports = userStore;
