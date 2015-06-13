/* 
* @Author: nimi
* @Date:   2015-05-22 15:50:51
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-13 11:20:29
*/

'use strict';

var User = require('../models').User;
var jwt = require('jwt-simple')
var passport = require('passport');
var querystring = require('querystring');
var sequelize = require('sequelize');

var getUserInfo = function(user) {
  var username = user.get('name');
  var level = user.get('level');
  var score = user.get('score');
  var country = user.get('country');
  var email = user.get('email');
  return {
    username: username,
    challengeNumber: level,
    score: score,
    country: country,
    email: email
  };
}

module.exports = {
  login: function(req, res, next){
    passport.authenticate('local-login', function(error, user, info){
      if(error){
        return next(error)
      } else if (!user){
        next (new Error(JSON.stringify(info)));
      } else {
        var token = jwt.encode(user.get('name'), 'codingisfun');
        var userInfo = getUserInfo(user);
        userInfo.token = token;
        res.send(userInfo);
      }
    })(req,res,next);
  },
  signup : function(req, res, next){
    passport.authenticate('local-signup', function(error, user, info){
      if(error){
        return next(error);
      } else if(!user){
        console.log(user);
        next(new Error(JSON.stringify(info)));
      } else {
        module.exports.login(req,res,next);
      }
    })(req, res, next)

  },

  instagramLogin: function(req,res,next){
    passport.authenticate('instagram')(req,res,next);
  },

  instagramCallback: function(req,res, next){
    passport.authenticate('instagram', function(error, user, info){
      if(error){
        console.log("error", error)
        res.redirect('/login');
      } else{
        var token = jwt.encode(user.get('name'), 'codingisfun');
        var username = user.get('name');
        res.redirect('/?' + querystring.stringify({name: username}) + '&' + querystring.stringify({token: token}));
      }
    })(req,res,next);
  },

  getUser: function(req, res, next) {
    var username = req.query.username;
    var token = req.query.token;
    User.find({where: {name: username}})
      .then(function(user) {
        if(user) {
          var userInfo = getUserInfo(user);
          userInfo.token = token;
          res.send(userInfo);
        } else {
          res.status(404);
        }
      })
      .catch(function(err) {
        res.send(err);
      });
  },

  checkAuth: function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {

      var parsedToken = JSON.parse(token);
      console.log("parsed:", parsedToken);
      var user = jwt.decode(parsedToken, 'codingisfun');
      console.log("user:", user);
      User.find({
        where: {
          name: user
        }
      })
        .then(function(foundUser) {
          if (foundUser) {
            var userInfo = getUserInfo(foundUser);
            userInfo.token = JSON.parse(token);
            console.log("userInfo for found user", userInfo);
            res.send(userInfo);
          } else {
            res.status(401);
          }
        })
        .error(function(error) {
          next(error);
        });
    }
  },

  updateUser: function(req, res, next) {
    var name = req.params.name;
    var score = req.body.score;
    var level = req.body.level;

    User.find({where:{name:name}})
      .then(function(user){
        user.set('score', score);
        user.set('level', level);
        user.save();
      })
  },

  instagramKey: function(req, res, next){
    var username = req.query.name;
    User.find({where: {name: username}})
      .then(function(user){
        if(user){
          res.send(JSON.stringify(user.instagramToken));
        } else{
          res.send(404);
        }
      });
  },

  leaders: function(req, res, next){
    //Find top 10 scorers and return an array of objects with each object representing a top 10 user in descending order based on score.
    //Object for user contains the user's instagramUserID, CoderGirlusername, and score.  
    //If the user does not have an instagramUserID, return undefined.

    var leaders = [];

    User.findAll({
      order: 'score DESC',
      limit: 10

    }).then(function(result){
      if(result){
        for(var i=0; i< result.length; i++){
          var topScorer = {
            instagramID: result[i].dataValues.instagramID,
            username: result[i].dataValues.name,
            score: result[i].dataValues.score
          }
          leaders.push(topScorer);
        }
        res.send(leaders);
        } else{
          res.send(404);
        }
    });
  }
}


