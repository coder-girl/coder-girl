/* 
* @Author: nimi
* @Date:   2015-05-26 11:54:26
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 14:45:05
*/

'use strict';

var testController = require('./testController');

module.exports = function(app){
  app.get('/getTest/:test', testController.getTest);
}
