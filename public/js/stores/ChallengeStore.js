/* 
* @Author: nimi
* @Date:   2015-05-28 15:28:17
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 20:27:25
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';

var _challengeStore = {}

var passChallenge = function(){
  console.log('the test passed')
};

var failChallenge = function(){
  console.log('the test failed')
};

var setChallenge = function(challenge){
  console.log(challenge)
  _challengeStore = challenge;
};

var challengeStore = objectAssign({}, EventEmitter.prototype, {

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb)
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb)
  },

  getChallenge: function(){
    return _challengeStore;
  }

});

AppDispatcher.register(function(payload){
  var action = payload.action;

  switch (action.actionType){

    case AppConstants.SET_CHALLENGE:
      setChallenge(action.data);
      challengeStore.emitChange();
      break;

    case AppConstants.PASS_CHALLENGE:
      passChallenge(action.data);
      challengeStore.emitChange();
      break;

    case AppConstants.FAIL_CHALLENGE:
      failChallenge();
      challengeStore.emitChange();
      break;

    default: 
      return true;
  }
})

module.exports = challengeStore;
