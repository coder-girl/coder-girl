'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var LeaderBoardActions = {


  //Revise to run functions to get User's key, then get leaders, then get pics.  

  getUserKey: function(email, password){
    var user = { email: email, password: password};
    $.ajax({
      url: '/api/users/login',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data){
        AppDispatcher.handleViewAction({
          actionType: AppConstants.LOGIN_USER,
          data: data
        })
      },
      error: function(xhr, status, error){
        console.error(xhr, status, error)
      }.bind(this) //NOTE: we may need a .bind(this) here-ish
    })
  },

  getLeaders: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGOUT_USER
    })
  },


  getPics: function(){


  }

}

module.exports = LeaderboardActions;