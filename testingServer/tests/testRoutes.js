/* 
* @Author: nimi
* @Date:   2015-05-26 11:54:26
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 12:12:03
*/

'use strict';

var testController = require('./testController');

module.exports = function(app){
  app.get('/getTest/:test', testController.getTest);
}
