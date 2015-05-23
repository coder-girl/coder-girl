/* 
* @Author: nimi
* @Date:   2015-05-21 16:17:55
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 17:45:04
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
        console.log('it worked!')
        AppDispatcher.handleAction({
          actionType: AppConstants.LOGIN_USER,
          data: data
        })
      },
      error: function(xhr, status, error){
        console.error(xhr, status, error)
      }.bind(this) //NOTE: we may need a .bind(this) here-ish
    })
}

}

module.exports = authActions;
