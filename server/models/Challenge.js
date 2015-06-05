/* 
* @Author: nimi
* @Date:   2015-05-28 20:00:41
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-03 18:07:48
*/

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Challenge', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    testCode: DataTypes.INTEGER,
    pointValue: DataTypes.INTEGER,
    hint1: DataTypes.STRING,
    hint2: DataTypes.STRING,
  }); 
}

