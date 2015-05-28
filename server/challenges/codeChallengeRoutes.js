/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:28
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 15:25:50
*/

'use strict';

var codeChallenge = require('./codeChallengeController.js');

module.exports = function(app){
  app.post('/submit/:testCode', codeChallenge.handleSubmit);
}
