/* 
* @Author: Mark Bennett
* @Date:   2015-05-30 15:38:30
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-13 11:21:24
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AuthStore = require('../stores/AuthStore');

var userActions = {

  updateUserScoreAndLevel: function(pointValue){
    var user = AuthStore.getUser();
    var name = user.username;
    user.challengeNumber += 1; 
    console.log('updated userscore')
    user.score += pointValue;
    var score = user.score;

    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_USER,
      data: user
    });

    $.ajax({
      url: '/api/users/' + name,
      dataType: 'json',
      type: 'PUT',
      data: {
        score: score,
        level: user.challengeNumber
      },
      success: function(data){
        console.log("User has been updated in the database. Score: ", data.score);
      },
      error: function(xhr, status, error){
        throw(error);
      }.bind(this) //NOTE: we may need a .bind(this) here-ish
    })
  }

};

module.exports = userActions;
