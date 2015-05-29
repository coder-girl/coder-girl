/* 
* @Author: nimi
* @Date:   2015-05-22 15:02:36
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 20:03:23
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

var models = ['User', 'Message', 'Challenge'];

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(module){
  module.User.hasMany(module.Message);
  module.Message.belongsTo(module.User);
})(module.exports);

module.exports.sequelize = sequelize; 
