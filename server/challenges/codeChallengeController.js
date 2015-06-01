/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:43
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-01 12:31:49
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
  },

  addChallenge: function(req, res, next){
    var challenge = req.body;

    if(!challenge.hasOwnProperty('title')){

      next(new Error('Challenges must have a title'));

    } else if (!challenge.hasOwnProperty('content')){

      next(new Error('Challenges must have content'));

    } else if (!challenge.hasOwnProperty('instructions')){

      next(new Error('Challenges must have instructions'));

    } else if(!challenge.hasOwnProperty('testCode')){

      next(new Error('Challenges must have a testCode'));

    } else if(!challenge.hasOwnProperty('pointValue')) {

      next(new Error('Challenges must have point value'));
    }

    Challenge.findOrCreate({ 
      where : {
        title: req.body.title,
        content: req.body.content,
        instructions: req.body.instructions,
        testCode: req.body.testCode,
        pointValue: req.body.pointValue
    }})
    .then(function(challenge){
      res.sendStatus(200)
    })
    .error(function(error){
      res.json('error?')
    })
  }
}
