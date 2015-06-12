/* 
* @Author: nimi
* @Date:   2015-05-21 16:17:55
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-12 12:03:09
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var authActions = {

  login: function(email, password){
    var user = { email: email, password: password};
    $.ajax({
      url: '/api/users/login',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data){
        AppDispatcher.dispatch({
          actionType: AppConstants.LOGIN_USER,
          data: data
        });
      },
      error: function(xhr, status, error){
        AppDispatcher.dispatch({
          actionType: AppConstants.FAILED_LOGIN,
          data: error
        });
        throw(error);
      }.bind(this) //NOTE: we may need a .bind(this) here-ish
    })
  },

  signup: function(email, password, country){
    var user = { email: email, password: password, country: country};
    $.ajax({
      url: '/api/users/signup',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data){
        AppDispatcher.dispatch({
          actionType: AppConstants.SIGNUP_USER,
          data: data
        })
      },
      error: function(xhr, status, error){
        AppDispatcher.dispatch({
          actionType: AppConstants.FAILED_SIGNUP,
          data: error
        });
        throw(error);
      }.bind(this) 
    })
  },

  clearErrors: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.CLEAR_ERRORS
    })
  },

  logout: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGOUT_USER
    })
  },

  instagramSetCurrentUser: function(data){
    $.ajax({
      url: '/api/users/user',
      dataType: 'json',
      type: 'GET',
      data: data,
      success: function(user){
        AppDispatcher.dispatch({
          actionType: AppConstants.INSTAGRAM_SET_CURRENT_USER,
          data: user
        })
      },
      error: function(xhr, status, error){
        throw(error);
      }.bind(this) 

    })
  },


  isAuth: function(tokenObject) {
    $.ajax({
      url: 'api/users/signedin',
      type: 'GET',
      headers: {
        'x-access-token': tokenObject
      },
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: AppConstants.VERIFY_SIGNIN,
          data: data
        });
      },
      error: function(xhr, status, error) {
        console.error(xhr, status, error);
        AppDispatcher.dispatch({
          actionType: AppConstants.REDIRECT_USER
        });
      }.bind(this)
    });
  },
};

module.exports = authActions;
