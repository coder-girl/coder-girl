'use strict';

var AuthStore = require('./AuthStore');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var _userStore = {
  currentUser: AuthStore.getUser()
};

var calculateLevel = function(score, challengeNumber) {
  var pointsNeedToLevel = [ 0, 100, 350, 700, 1100, 1500, 2000, 2600, 3300, 4100];

  var index = 0;

  while (pointsNeedToLevel[index] < score) {
    index++;
  }

  var lastTotalPoints = pointsNeedToLevel[index-1];

  var pointsEarnedThisLevel = score - lastTotalPoints; 

  var pointsNeedThisLevel = pointsNeedToLevel[index] - lastTotalPoints; 

  var level = index;

  return  {
    'level': level,
    'percentageCompleted': pointsEarnedThisLevel,
    'totalPoints': pointsNeedThisLevel
  }
};


var UserStore = objectAssign({}, EventEmitter.prototype, {
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
    return _userStore.currentUser;
  },
  getLevel: function(score,challengeNumber){
    return calculateLevel(score, challengeNumber);
  }
});

module.exports = UserStore;
