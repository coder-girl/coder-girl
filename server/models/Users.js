/* 
* @Author: nimi
* @Date:   2015-05-22 15:26:30
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 16:50:31
*/

'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  country: DataTypes.STRING,
  score: DataTypes.INTEGER,
  level: DataTypes.INTEGER,
  instagramID: DataTypes.INTEGER,
  instagramName: DataTypes.STRING
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

