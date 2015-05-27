/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 20:27:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 19:24:17
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var AuthStore = require('../stores/AuthStore');

var MessageActions = {

  createMessage: function(text, roomId){
    var currentUser = AuthStore.getUser();
    // console.log("CURRENT USER: ", currentUser);
    var newMessage = {
      UserId: 2,
      roomId: roomId,
      text: text
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
      }
      // error: function(xhr, status, error){
      //   console.log(error);
      // }.bind(this)
    });

  } // end of createMessage
}; // end of MessageActions 

module.exports = MessageActions;