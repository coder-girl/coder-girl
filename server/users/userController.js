/* 
* @Author: nimi
* @Date:   2015-05-22 15:50:51
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 10:28:24
*/

'use strict';

var User = require('../models').Users;
var jwt = require('jwt-simple')
var passport = require('passport');
var querystring = require('querystring');
var sequelize = require('sequelize');

module.exports = {
  login: function(req, res, next){
    passport.authenticate('local-login', function(error, user, info){
      if(error){
        return next(error)
      } else if (!user){
        next (new Error(info));
      } else {
        var token = jwt.encode(user.get('name'), 'codingisfun');
        var username = user.get('name');
        res.send({
          token: token,
          username: username
        })
      }
    })(req,res,next);
  },
  signup : function(req, res, next){
    passport.authenticate('local-signup', function(error, user, info){
      if(error){
        return next(error)
      } else if(!user){
        console.log(user)
        next(new Error(JSON.stringify(info)))
      } else {
        module.exports.login(req,res,next)
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


  instagramKey: function(req, res, next){
    var username = req.query.name;

    User.find({where: {name: username}}).then(function(user){
      if(user){
        res.send(JSON.stringify(user.instagramToken));
        } else{
          res.send(404);
        }
      })

    },


  leaders: function(req, res, next){

    //Find top 10 scorers and return Instagram ID's in descending order based on score
    var leaders = [];

    User.findAll({
      order: 'score DESC',
      limit: 10

    }).then(function(result){
      if(result){
        for(var i=0; i< result.length; i++){
          leaders.push(result[i].dataValues.instagramID);
        }
        res.send(leaders);
        } else{
          res.send(404);
        }
      })

    },


}


