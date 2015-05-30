/* 
* @Author: nimi
* @Date:   2015-05-28 15:28:17
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 15:57:21
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';
var Router = require('react-router');

var _challengeStore = {}

var passChallenge = function(data){
  _challengeStore.results.push('You passed!')
};

var failChallenge = function(){
  _challengeStore.results.push('YOU FAILED')
};

var setChallenge = function(challenge){
  _challengeStore = challenge;
  _challengeStore['results'] = [];
};

var setChangeType = function(change)  {
  _challengeStore.changeType = change;
};

var challengeStore = objectAssign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb)
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb)
  },

  getChallenge: function() {
    return _challengeStore;
  },

  getChangeType: function() {
    return _challengeStore.changeType;
  }

});

AppDispatcher.register(function(payload){
  var action = payload.action;

  switch (action.actionType){

    case AppConstants.SET_CHALLENGE:
      setChallenge(action.data);
      setChangeType('new challenge');
      challengeStore.emitChange();
      break;

    case AppConstants.PASS_CHALLENGE:
      passChallenge(action.data);
      setChangeType('passed');
      challengeStore.emitChange();
      break;

    case AppConstants.FAIL_CHALLENGE:
      failChallenge();
      setChangeType('failed');
      challengeStore.emitChange();
      break;

    default: 
      return true;
  }
})

module.exports = challengeStore;
