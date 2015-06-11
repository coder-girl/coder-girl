/* 
* @Author: Mark Bennett
* @Date:   2015-06-10 18:04:09
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-10 18:57:04
*/

'use strict';

var request = require('request');
var allChallenges = require('./allChallenges').challenges;

module.exports = function() {
  allChallenges.forEach(function(challenge) {
    var data = JSON.stringify(challenge);
    var url = 'http://localhost:300/api/challenges/addChallenge';
    request.post({
      url: url,
      body: data,
      json: true
    }, function(error, response, body) {
      if (error) {
        response.status(404).send(error);
      } else {
        response.send(200);
      }
    });
  });
};
