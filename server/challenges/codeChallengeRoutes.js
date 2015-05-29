/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:28
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 19:57:42
*/

'use strict';

var codeChallenge = require('./codeChallengeController.js');

module.exports = function(app){
  app.get('/getChallenge/:testCode', codeChallenge.getChallenge);
}
