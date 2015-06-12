/* 
* @Author: nimi
* @Date:   2015-05-22 11:03:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-12 10:48:48
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';

var _authStore = {
  currentUser: {},
  error: ""
};

var setCurrentUser = function(data){
  _authStore.currentUser = data;
  _authStore.currentUser.isAuth = true;
  var userToken = JSON.stringify(data.token);
  window.localStorage.setItem('io.codergirl', userToken);
};

var clearCurrentUser = function() {
  _authStore.currentUser = null;
  window.localStorage.removeItem('io.codergirl');
  window.location = '/';
};

var invalidateUser = function(){
  _authStore.currentUser.isAuth = false;
};

var setLoginError = function(error) {
  _authStore.error = error;
};

var AuthStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getUser: function() {
    return _authStore.currentUser;
  },
  getLoginError: function() {
    return _authStore.error;
  }
});

AppDispatcher.register(function(action) {

  switch (action.actionType) {

    case AppConstants.LOGIN_USER:
      setCurrentUser(action.data);
      AuthStore.emitChange();
      break;

    case AppConstants.LOGOUT_USER:
      clearCurrentUser();
      AuthStore.emitChange();
      break;

    case AppConstants.FAILED_LOGIN:
      setLoginError("Incorrect email and password combination. Please try again.");
      AuthStore.emitChange();
      break;

    case AppConstants.INSTAGRAM_SET_CURRENT_USER:
      setCurrentUser(action.data);
      AuthStore.emitChange();
      break;

    case AppConstants.SIGNUP_USER:
      setCurrentUser(action.data);
      AuthStore.emitChange();
      break;

    case AppConstants.UPDATE_USER:
      setCurrentUser(action.data);
      AuthStore.emitChange();
      break;

    case AppConstants.VERIFY_SIGNIN:
      setCurrentUser(action.data)
      AuthStore.emitChange(); 
      break;

    case AppConstants.REDIRECT_USER:
      invalidateUser();
      AuthStore.emitChange(); 
      break;

    default:
      return true;
  }
});

module.exports = AuthStore;
