/* 
* @Author: nimi
* @Date:   2015-05-28 20:00:41
<<<<<<< HEAD
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-11 15:19:26
=======
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-11 15:51:50
>>>>>>> (feat) Add tests 1-9 and review and clean challenges 1 - 9
*/

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Challenge', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    testCode: {type: DataTypes.INTEGER, unique: true},
    pointValue: DataTypes.INTEGER,
    hint1: DataTypes.STRING,
    hint2: DataTypes.STRING,
  }); 
}

