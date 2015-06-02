/* 
* @Author: nimi
* @Date:   2015-05-28 13:13:49
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-30 16:00:31
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ChallengeStore = require('../stores/ChallengeStore');
var UserActions = require('./UserActions');

var challengeActions = {

  getChallenge: function(code){
    $.ajax({
      url: '/api/challenges/getChallenge/' + code,
      dataType: 'json',
      type: 'GET',
      success: function(challenge){
        AppDispatcher.handleViewAction({
          actionType: AppConstants.SET_CHALLENGE,
          data: challenge
        });
        return challenge;
      },
      error: function(xhr, status, error){
        throw(error);
      }.bind(this) //NOTE: we may need a .bind(this) here-ish
    });
  },

  submitCode: function(userCode, testCode){
    var testWorker = new Worker('./js/testWorker.js');
    testWorker.postMessage([testCode, userCode]);
    testWorker.addEventListener('message', function(e) {
      if(e.data){

        var pointValue = ChallengeStore.getChallenge().pointValue;
        UserActions.updateUserScoreAndLevel(pointValue);

        AppDispatcher.handleViewAction({
          actionType: AppConstants.PASS_CHALLENGE,
          data: e.data
        })
      } else {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.FAIL_CHALLENGE
        })
      }
    }, false);
  }
};

module.exports = challengeActions;

