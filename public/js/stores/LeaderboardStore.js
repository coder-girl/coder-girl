'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants')
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';

var _LeaderboardStore = {};

var updatePictureArray = function(data){
  _LeaderboardStore.pictures = data;

};


var LeaderboardStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener : function(cb){
    this.on(CHANGE_EVENT, cb)
  },
  removeChangeListener : function(cb){
    this.removeListener(CHANGE_EVENT, cb)
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  },
  getPictures: function(){
    return _LeaderboardStore.pictures;
  },

})

AppDispatcher.register(function(action){
  switch(action.actionType){
    case AppConstants.GET_PICS:
      updatePictureArray(action.data);
      LeaderboardStore.emitChange();
      break;
    default:
      return true;
  }
})

module.exports = LeaderboardStore;


