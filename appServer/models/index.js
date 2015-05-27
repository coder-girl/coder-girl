/* 
* @Author: nimi
* @Date:   2015-05-22 15:02:36
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 13:02:00
*/

'use strict';

var Sequelize = require('sequelize');

//initialize database

var database = process.env.DATABASE_NAME || 'coderGirl';
var username = process.env.DATABASE_USERNAME || 'codergirl';
var password = process.env.DATABASE_PASSWORD || 'code';
var host = process.env.DATABASE_HOST || 'localhost';


var sequelize = new Sequelize(database, username, password, {
  dialect: 'postgres',
  host: host
})

var models = ['Users'];

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// (function(module){
//   module.Challenges.hasMany(module.Tests);
//   module.Tests.belongsTo(module.Challenges);

//   module.Users.belongsToMany(module.Challenges, {through: 'UsersChallenges'});
//   module.Challenges.belongsToMany(module.Users, {through: 'UsersChallenges'});
  
// }(module.exports));

module.exports.sequelize = sequelize; 
