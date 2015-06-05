/* 
* @Author: nimi
* @Date:   2015-05-28 13:13:49
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-05 13:02:52
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
        AppDispatcher.dispatch({
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
    var testWorker = new window.Worker('./js/testWorker.js');
    testWorker.postMessage([testCode, userCode]);
    var timeout;
    testWorker.onmessage = function(event) {
      window.clearTimeout(timeout);
        timeout = window.setTimeout(function(){
          testWorker.terminate();
          testWorker= undefined;
          var result = {
            pass: false,
            message: "Your script took too long! Do you have any infinite loops anywhere?"
          };
          AppDispatcher.dispatch({
            actionType: AppConstants.FAIL_CHALLENGE,
            data: result
          })
        },2000)
      if(event.data.finished){
        window.clearTimeout(timeout);
        timeout = undefined;
        if(event.data.pass){
          var pointValue = ChallengeStore.getChallenge().pointValue;
          UserActions.updateUserScoreAndLevel(pointValue);

          AppDispatcher.dispatch({
            actionType: AppConstants.PASS_CHALLENGE
          })
        } else {
          AppDispatcher.dispatch({
            actionType: AppConstants.FAIL_CHALLENGE,
            data: event.data
          })
        }
      }
    };
  }
};

module.exports = challengeActions;

