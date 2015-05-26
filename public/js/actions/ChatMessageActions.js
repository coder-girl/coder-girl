/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 20:27:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 16:31:48
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var AuthStore = require('../stores/AuthStore');

var MessageActions = {

  createMessage: function(text, roomId){
    var currentUser = AuthStore.getUser() || "madeUpUser1";
    var newMessage = {
      authorName: currentUser,
      roomId: roomId,
      text: text,
      date: Date.now()
    };

    $.ajax({
      url: '/api/messages/create',
      dataType: 'json',
      type: 'POST',
      data: newMessage,
      success: function(data){
        AppDispatcher.handleViewAction({
          actionType: AppConstants.CREATE_MESSAGE,
          data: data
        });
      },
      error: function(xhr, status, error){
        console.error(xhr, status, error)
      }.bind(this)
    });

  }
}; 

module.exports = MessageActions;