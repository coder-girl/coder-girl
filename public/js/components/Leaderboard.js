'use strict';

var React = require('react/addons');
var config  = require('../../env/config.js');
var instaKey = config.INSTAGRAM_CLIENT_ID;

//user's key.  if they don't have key, we need to use our client_id -- in config file
//and need to change access_token in url to client_id


var Leaderboard = React.createClass({

  //Parses querystring in URL
  getParameterByName: function(name){
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },


  getInitialState: function(){
      
      // The pictures array will be populated via AJAX
      //Default instagram key is app client id
      
      return { 
        pictures: [],
        username: '',
        instagramKey: instaKey,
        instagramTokenLabel: 'client_id=',
      };
  },

  componentDidMount: function(){

      var self = this;

      var username = this.getParameterByName("name");
      this.setState({
        username: username
      });

      
      var getPics = function(topScorerInstagramIDs){

        var pictures = [];

        for(var i=0; i< topScorerInstagramIDs.length; i++){
          var userInstagramID = topScorerInstagramIDs[i];
          var url = 'https://api.instagram.com/v1/users/' + userInstagramID + '/media/recent/?' + self.state.instagramTokenLabel + self.state.instagramKey;

          $.ajax({
            url: url,
            dataType: 'jsonp',
            type: 'GET',
            success: function(result){

              if(!result.data){
                  console.log("Error message from Instagram:", result.meta.error_message);
                  return;
              } else {
              console.log(result.data);

              pictures.push({ 
                      user: result.data[0].user.username,
                      id: result.data[0].id, 
                      url: result.data[0].link, 
                      src: result.data[0].images.low_resolution.url, 
                      title: result.data[0].caption ? result.data[0].caption.text : ''
                  });

              // Update the component's state. This will trigger a render.

              self.setState({ pictures: pictures });
            }

            },
            error: function(xhr, status, error){
              console.error(xhr, status, error)
            }
          })

          }

        };


        var getTopScorers = function(){
          $.ajax({
            url: '/api/users/leaders',
            dataType: 'json',
            type: 'GET',
            success: function(data){
                
              //Once get leaders, call to instagram to get photos.  Data is the array of Instagram user IDs.
              getPics(data);
              
            },
            error: function(xhr, status, error){
              console.error(xhr, status, error)
            }.bind(this) 
          })

        };



      //If have a username in params, send an AJAX request to the server to get the signed in user's instagram access toekn.

      if(username){
        $.ajax({
          url: '/api/users/instagramKey',
          data: { name: username },
          dataType: 'json',
          type: 'GET',
          success: function(data){
            //If received the user's access token back, change the instagram key to the 
            //user's token and chnage the label to be used in the URS to access_token
            self.setState({instgramKey: data, instgramTokenLabel: 'access_token='})

              //Call to server to get leaders
              getTopScorers();

          },
          error: function(xhr, status, error){
            console.error(xhr, status, error)
            getTopScorers();
          }.bind(this) 
        })
      } else {
        //If don't have a user who signed in with instagram, just go ahead and get top scorers
        getTopScorers();

      }

  },

  showUser: function(user){
    //Create function when mouseover image, show username.
    // console.log(user);
  },

  render: function() {

          var self = this;

          var pictures = this.state.pictures.map(function(p){

              return (
                <div key={p.id}>
                  <img onMouseOver={self.showUser.bind(null, p.user)} ref={p.id} src={p.src} title={p.title} />
                  <p>{p.user}</p>
                </div>

                )
          });

          if(!pictures.length){
              pictures = <p>Loading images...</p>;
          }


          return (

              <div>
                  <h1>Leaderboard</h1>
                  <div className="pictures"> {pictures} </div>
                      
              </div>

          );
    }



});


module.exports = Leaderboard;



