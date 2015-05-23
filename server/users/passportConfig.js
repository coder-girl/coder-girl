/* 
* @Author: nimi
* @Date:   2015-05-22 15:50:37
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 17:42:34
*/

'use strict';

var config  = require('../config/config.js')
var LocalStrategy = require('passport-local').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;

var Users = require('../models').Users;

module.exports = function(passport) {
  passport.use('local-login', new LocalStrategy(
    {usernameField: 'email'}, 
    function(username, password, done){
      Users.find({where : {email: username} }).then(function(user){
        if(user){
          user.comparePassword(password, function(isMatch){
            if(isMatch){
              return done(null, user)
            } else {
              return done(null, false, 'The password did not match')
            }
          })
        } else {
          return done(null, false, 'The user does not exist')
        }
      })
    })); 

  passport.use('local-signup', new LocalStrategy(
    {usernameField: 'email'},
    function(username, password, done){
      Users.find( {where: {email: username}}).then(function(user){
        if(user){
          return done(null, false, 'User exists!')
        } else {
          Users.build( {email: username, password: password})
            .save()
            .then(function(user){
              console.log('USER', user)
              return done(null,user)
            })
            .catch(function(error){
              return done(error);
            })
        }
      })
    }));

  passport.use(new InstagramStrategy({
    clientID: config.INSTAGRAM_CLIENT_ID,
    clientSecret: config.INSTAGRAM_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/instagram/callback'
  },
  function(accessToken, refreshToken, profile, done){
    Users.find({where: {instagramID: profile.id}}).then(function(user){
      if(!user){
        Users.build({
          instagramName: profile.username, 
          instagramID: profile.id,
        })
        .save()
        .then(function(user){
          return done(null, user);
        })
        .catch(function(error){
          return done(error)
        })
      } else {

      }
    })
  }
  ))
}

