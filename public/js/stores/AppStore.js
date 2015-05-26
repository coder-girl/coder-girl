var React = require('react');

var Data = require('../model/editorData');
var Api = require('../utils/Api');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var editorStore = objectAssign({}, EventEmitter.prototype, {
  getInitialState: function() {
    return {
      editor: Api.editor,
      settings: Api.settings
    };
  },

  fetchData: function(data) {
    if (!data) {
      this.data = new Data(Api.settings, Api.editor);
    } else {
      this.data;
      this.trigger(this.data);
    }
  }
});


AppDispatcher.register(function(payload) {
  var action = payload.action;
});


module.exports = editorStore;
