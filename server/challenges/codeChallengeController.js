/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:43
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 20:13:12
*/

'use strict';

var Promise = require('bluebird');
var Challenge = require('../models').Challenge;

module.exports = {
  getChallenge: function(req, res, next){
    var testCode= req.params.testCode;
    Challenge.find({where: {testCode: testCode}})
      .then(function(challenge){
        res.json(challenge)
      })
  }
}
