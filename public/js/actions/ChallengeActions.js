/* 
* @Author: nimi
* @Date:   2015-05-28 13:13:49
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-04 17:19:36
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
    var testWorker = new Worker('./js/testWorker.js');
    testWorker.postMessage([testCode, userCode]);
    testWorker.onMessage(function(event) {
      if(event.data.started){ // the worker has fired off a message saying it's begun evaluating the code
        var timeout = window.setTimeout(function(){
          testWorker.stop();
          var result = {
            pass: false,
            message: "Your script took too long! Do you have any infinite loops anywhere?"
          };
          AppDispatcher.dispatch({
            actionType: AppConstants.FAIL_CHALLENGE,
            data: result
          })
        },2000)
      } else if(event.data.complete){
        window.clearTimeout(timeout);
        if(event.data.pass){
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
      
    });
  }
};

module.exports = challengeActions;

