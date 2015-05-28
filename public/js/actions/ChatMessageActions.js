/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 20:27:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 15:27:15
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var AuthStore = require('../stores/AuthStore');

var socket = io.connect();

socket.on('new message', function(data) {
  AppDispatcher.handleViewAction({
    actionType: ChatConstants.CREATE_MESSAGE,
    data: data
  });
})

var MessageActions = {

  createMessage: function(text, roomName){
    var currentUser = AuthStore.getUser();
    var newMessage = {
      createdAt: Date.now(),
      authorName: currentUser.username,
      roomName: roomName,
      text: text
    };

    socket.emit('send message', newMessage);
    
  }, // end of createMessage

  getMessages: function() {
    $.ajax({
      url: '/api/messages/',
      dataType: 'json',
      type: 'GET',
      success: function(data){
        AppDispatcher.handleViewAction({
          actionType: ChatConstants.RECEIVE_MESSAGES,
          data: data
        });
      }
    })
  }
}; // end of MessageActions 

module.exports = MessageActions;