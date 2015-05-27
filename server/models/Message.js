/* 
* @Author: Mark Bennett
* @Date:   2015-05-26 14:26:59
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 17:00:55
*/

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    text: DataTypes.STRING,
    authorName: DataTypes.STRING,
    date: DataTypes.DATE,
    roomName: DataTypes.STRING
  }); 
}

