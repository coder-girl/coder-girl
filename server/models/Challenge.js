/* 
* @Author: nimi
* @Date:   2015-05-28 20:00:41
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-30 15:20:56
*/

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Challenge', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    testCode: DataTypes.INTEGER,
    pointValue: DataTypes.INTEGER
  }); 
}

