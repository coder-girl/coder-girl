/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:43
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-25 12:54:20
*/

'use strict';

var Sandbox = require('sandbox');
var Challenges = require('../models').Challenges;

module.exports = {
  handleSubmit : function(req, res, next){
    var code = req.body.code;
    var tests = this.findTests(req);
    var testingArea = new Sandbox();
    testingArea.run(code, function(output){
      res.send(output)
    })
  },

  findTests : function(req){
    var challengeId = req.body.challengeId;
    Challenges.find({where : {id : challengeId}})
      .then(function(challenge){
        challenge.getTests()
        .then(function(tests){
          return tests;
        })
      })
  }
}
