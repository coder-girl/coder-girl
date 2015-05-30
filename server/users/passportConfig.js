/* 
* @Author: nimi
* @Date:   2015-05-22 15:50:37
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-13 09:12:29
*/

'use strict';
)
var LocalStrategy = require('passport-local').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models').User;

module.exports = function(passport) {
  // this configures the local strategy for a user logging in
  passport.use('local-login', new LocalStrategy(
    // since the user is logging in with email, we have to change the usernameField to match 
    {usernameField: 'email'}, 
    // this function will search the database for the user and compare the user-provided password with the one stored
    function(username, password, done){
      // searches the database for a user with a matching email field
      User.find({where : {email: username} })
        // the user refers to the user in the database
        .then(function(user){
          // if the user exists in the database
          if(user){
            // call the instance method comparePasswords to see if the correct password was inputted
            user.comparePassword(password, function(isMatch){
              // isMatch is a boolean value
              if(isMatch){
                // return the callback with null and the user object
                return done(null, user)
              } else {
                // return the callback with null, a false instead of a user object, and an info message
                return done(null, false, 'The password did not match')
              }
            })
          // if no user is found
          } else {
            // return the callback with null, a false instead of a user object, and an info message
            return done(null, false, 'The user does not exist')
          }
      })
    })); 
  
  // this configures the local strategy for a user signing up
  passport.use('local-signup', new LocalStrategy(
    // since the user is logging in with email, we have to change the usernameField to match 
    {usernameField: 'email'},
    function(username, password, done){
      // searches the database for a user with a matching email field
      User.find( {where: {email: username}}).then(function(user){
        // if the user exists
        if(user){
          //  return the callback with null, a false user, and an info message
          return done(null, false, 'User exists!')
        } else {
          // build the user to be saved into the database
          User.build( {email: username, password: password})
            // save the user into the database
            .save()
            .then(function(user){
              // return the callback with null and the newly created user object
              return done(null,user)
            })
            .catch(function(error){
              // if any errors occur, return the callback with the only argument being the error in a readable format
              return done(JSON.stringify(error));
            })
        }
      })
    }));
  
  // this configures the strategy for a user signing up/ logging in with Instagram
  passport.use(new InstagramStrategy({
    // the clientID and and clientSecret are obtained by contacting Instagram and obtaining application keys
    clientID: process.env.INSTAGRAM_CLIENT_ID
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/instagram/callback'
  },
  // this function gets called when the user comes back from signing in to instagram
  function(accessToken, refreshToken, profile, done){
    // find users with a matching instagram id
    User.find({where: {instagramID: profile.id}}).then(function(user){
      // if the user does not exist
      if(!user){
        // build the user to be saved into the database
        User.build({
          // save the user's instagram profile name and id
          instagramName: profile.username, 
          instagramID: profile.id,
          instagramToken: accessToken
        })
        // save the user into the database
        .save()
        .then(function(user){
          // return the callback with null and the newly created user object
          return done(null, user);
        })
        // catch any errors
        .catch(function(error){
          // return the callback with the error in a readable format
          return done(JSON.stringify(error));
        })
      } else {
        // return the callback with a null and the user object
        return done(null, user)

      }
    })
  }
  ))
}

