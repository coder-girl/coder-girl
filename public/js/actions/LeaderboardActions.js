'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var config  = require('../../env/config.js');

var instagramKey = config.INSTAGRAM_CLIENT_ID;
var instagramTokenLabel = 'client_id=';

var LeaderboardActions = {


getPics: function(topScorerInstagramIDs){

    var pictures = [];

    for(var i=0; i< topScorerInstagramIDs.length; i++){
      var topUserInstagramID = topScorerInstagramIDs[i];
      var url = 'https://api.instagram.com/v1/users/' + topUserInstagramID + '/media/recent/?' + instagramTokenLabel + instagramKey;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        success: function(result){

          if(!result.data){
              console.log("Error message from Instagram:", result.meta.error_message);
              return;
          } else {

            pictures.push({ 
                    user: result.data[0].user.username,
                    id: result.data[0].id, 
                    url: result.data[0].link, 
                    src: result.data[0].images.low_resolution.url, 
                    title: result.data[0].caption ? result.data[0].caption.text : ''
                });

            //Send the updated picture array through the dispatcher to the LeaderboardStore

            AppDispatcher.handleServerAction({
              actionType: AppConstants.GET_PICS,
              data: pictures
            })

          }

        },
        error: function(xhr, status, error){
          console.error(xhr, status, error)
        }
      })

      }

    },


  getTopScorers: function(){

    var self = this;

    $.ajax({
      url: '/api/users/leaders',
      dataType: 'json',
      type: 'GET',
      success: function(data){
          
        //Once get leaders, call to instagram to get photos.  Data is the array of Instagram user IDs.
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

