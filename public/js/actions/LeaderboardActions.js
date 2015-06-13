'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var instagramKey = process.env.INSTAGRAM_CLIENT_ID || require('../../env/config.js').INSTAGRAM_CLIENT_ID;
var async = require('async');

var instagramTokenLabel = 'client_id=';

var LeaderboardActions = {


getPics: function(topScorers){

  var callforImages= function(item, next){

    var photoInfo = {
      id: item.username, 
      src: '../asset/CoderGirl-WhiteBackground.png', 
      title: '',
      score: item.score,
      username: item.username
    }


      if(!item.instagramID){

        next(null, photoInfo);


      } else {

        var topUserInstagramID = item.instagramID;
        var url = 'https://api.instagram.com/v1/users/' + topUserInstagramID + '/media/recent/?count=' + 10 + '&' + instagramTokenLabel + instagramKey;
        $.ajax({
          url: url,
          dataType: 'jsonp',
          type: 'GET',
          success: function(result){

            if(!result.data){
                console.log("Error message from Instagram:", result.meta.error_message);
               
                next(null, photoInfo);
            } else {

                var picArray = []

                for(var i=0; i< result.data.length; i++){
                  picArray.push(result.data[i].images.low_resolution.url)
                }

                    photoInfo = { 
                        instagramUsername: result.data[0].user.username,
                        id: item.username, 
                        url: result.data[0].link, 
                        src: result.data[0].images.low_resolution.url, 
                        allPics: picArray,
                        title: result.data[0].caption ? result.data[0].caption.text : '',
                        score: item.score,
                        username: item.username
                      }

                next(null, photoInfo);

              }

            },
            error: function(xhr, status, error){
              console.error(xhr, status, error)
              next(null, photoInfo);
            }
          })

      }

  };
    

  async.map(topScorers, callforImages, function(err, results){
      console.log(err)
      AppDispatcher.dispatch({
        actionType: AppConstants.GET_PICS,
        data: results
      })


    })


    },


  getTopScorers: function(){

    var self = this;

    $.ajax({
      url: '/api/users/leaders',
      dataType: 'json',
      type: 'GET',
      success: function(data){
          
        //Once get leaders, call to instagram to get photos.  Data is an array of objcts containing instagramUserID, CoderGirlusername, and score.
        self.getPics(data);
        
      },
      error: function(xhr, status, error){
        console.error(xhr, status, error)
      }.bind(this) 
    })

  },

  getAccessToken: function(username){
    var self = this;

    $.ajax({
      url: '/api/users/instagramKey',
      data: { name: username },
      dataType: 'json',
      type: 'GET',
      success: function(data){

        //If received the current user's instagram token back from server, change the 
        //instagram key to the user's token and change the lable in the URL to access_token

        if(data){
          instagramKey = data;
          instagramTokenLabel = 'access_token='
        }

        //Call to server to get leaders
        self.getTopScorers();

      },
      error: function(xhr, status, error){
        console.error(xhr, status, error)
        
        self.getTopScorers();

      }.bind(this) 
    })
  }

};

module.exports = LeaderboardActions;

