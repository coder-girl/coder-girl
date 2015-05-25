/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:28
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-25 12:49:28
*/

'use strict';

var codeChallenge = require('./codeChallengeController.js');

module.exports = function(app){
  app.post('/submit', codeChallenge.handleSubmit);
}
 
