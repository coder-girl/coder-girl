/* 
* @Author: nimi
* @Date:   2015-05-22 15:50:44
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 17:04:27
*/

'use strict';
 var userController = require('./userController.js');

 module.exports = function(app){
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
 // app.get('/signedin', userController.checkAuth);
  app.get('/instagram', userController.instagramLogin)
  app.get('/instagram/callback', userController.instagramCallback)
 }
