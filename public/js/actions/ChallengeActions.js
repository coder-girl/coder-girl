/* 
* @Author: nimi
* @Date:   2015-05-28 13:13:49
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 19:37:30
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var challengeActions = {

  getChallenge: function(code){
    // TODO: receive data from database
    var challenge = {
      title: 'Javascript',
      content: 'var example = function(){ \n //enter your code here! \n}',
      instructions: 'Write a function that takes two arguments and returns the sum',
      testCode: 1
    };

    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_CHALLENGE,
      data: challenge
    })

    return challenge;
  },

  submitCode: function(userCode, testCode){
    var testWorker = new Worker('./js/testWorker.js');
    testWorker.postMessage([testCode, userCode]);
    testWorker.addEventListener('message', function(e) {
      if(e.data){
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

