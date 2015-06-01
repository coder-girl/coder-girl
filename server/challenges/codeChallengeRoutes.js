/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:28
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-01 11:53:41
*/

'use strict';

var codeChallenge = require('./codeChallengeController.js');

module.exports = function(app){
  app.get('/getChallenge/:testCode', codeChallenge.getChallenge);
  app.post('/addChallenge', codeChallenge.addChallenge);
}
