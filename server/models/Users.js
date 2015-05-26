/* 
* @Author: nimi
* @Date:   2015-05-22 15:26:30
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 19:22:08
*/

'use strict';

var bcrypt = require('bcrypt-nodejs');
var generateName = require('sillyname');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  country: DataTypes.STRING,
  score: DataTypes.INTEGER,
  level: DataTypes.INTEGER,
  instagramID: DataTypes.INTEGER,
  instagramName: DataTypes.STRING,
  instagramToken: DataTypes.STRING
  },
  {
    instanceMethods :{
      comparePassword: function(inputPassword, callback){
        var userPassword = this.get('password');
        bcrypt.compare(inputPassword, userPassword, function(err, isMatch){
          if(err){
            console.error(err)
          } else {
            callback(isMatch)
          }
        })
      }
    },

    hooks: {
      beforeCreate: function(user, options, callback){
        // TODO: check for duplicated names and redo sillyname if there are
        var sillyName = generateName() + (Math.floor(Math.random() * 100)) 
        user.set('name', sillyName);
        bcrypt.hash(user.password, null, null, function(err, hashPassword){
          if(err){
            console.error(err)
          } else {
            user.password = hashPassword;
            callback(null, user)
          }
        })
      }
    }
  }); 
}

