/* 
* @Author: nimi
* @Date:   2015-05-22 15:50:44
<<<<<<< HEAD:server/users/userRoutes.js
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-30 14:57:15
=======
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 12:08:08
>>>>>>> (feat) Rename server folder:appServer/users/userRoutes.js
*/

'use strict';
 var userController = require('./userController.js');

 module.exports = function(app){
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);

  app.put('/:name', userController.updateUser);
  
  app.get('/signedin', userController.checkAuth);
  app.get('/user', userController.getUser);
  app.get('/instagram', userController.instagramLogin);
  app.get('/instagram/callback', userController.instagramCallback);
  app.get('/instagramKey', userController.instagramKey);
  app.get('/leaders', userController.leaders);
 }
