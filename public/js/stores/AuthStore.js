/* 
* @Author: nimi
* @Date:   2015-05-22 11:03:34
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 11:24:57
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants')
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';

var _authStore = {
  currentUser: {}
};

var setCurrentUser = function(user){
  _authStore.currentUser = user;
}

var clearCurrentUser = function(){
  _authStore.currentUser = {};
}

var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener : function(cb){
    this.on(CHANGE_EVENT, cb)
  },
  removeChangeListener : function(cb){
    this.removeListener(CHANGE_EVENT, cb)
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  },
  getUser: function(){
    return _authStore.currentUser;
  }
})

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case AppConstants.LOGIN_USER:
      setCurrentUser(action.data);
      userStore.emitChange();
      break;
    case AppConstants.LOGOUT_USER:
      clearCurrentUser();
      userStore.emitChange();
      break;
    default:
      return true;
  }
})