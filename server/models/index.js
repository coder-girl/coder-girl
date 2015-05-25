/* 
* @Author: nimi
* @Date:   2015-05-22 15:02:36
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-25 15:10:59
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
  protocol: 'postgres',
  host: host
})

var models = ['Users'];

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname + '/' + model);
})

// (function(module){
//   // TODO: include relationships here
// })(module.exports)

module.exports.sequelize = sequelize; 
