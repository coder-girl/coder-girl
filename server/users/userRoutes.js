/* 
* @Author: nimi
* @Date:   2015-05-22 15:50:44
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 14:46:29
*/

'use strict';
 var userController = require('./userController.js');

 module.exports = function(app){

  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
 // app.get('/signedin', userController.checkAuth);
  app.get('/instagram', userController.instagramLogin);
  app.get('/instagram/callback', userController.instagramCallback);
  app.get('/instagramKey', userController.instagramKey);
  app.get('/leaders', userController.leaders);
 }
