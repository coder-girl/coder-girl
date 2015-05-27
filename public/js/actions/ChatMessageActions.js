/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 20:27:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 10:40:54
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var AuthStore = require('../stores/AuthStore');

var MessageActions = {

  createMessage: function(text, roomName){
    var currentUser = AuthStore.getUser();
    // console.log("CURRENT USER: ", currentUser);
    var newMessage = {
      username: currentUser,
      roomName: roomName,
      text: text
    };

    $.ajax({
      url: '/api/messages/create',
      dataType: 'json',
      type: 'POST',
      data: newMessage,
      success: function(data){
        AppDispatcher.handleViewAction({
          actionType: ChatConstants.CREATE_MESSAGE,
          data: data
        });
      }
    });

  }, // end of createMessage

  getAllMessages: function() {
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