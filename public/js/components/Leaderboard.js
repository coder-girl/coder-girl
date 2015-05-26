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
      //When the component loads, send an AJAX request to the server to get access_token of 
      //signed in user

      var username = this.getParameterByName("name");
      this.setState({
        username: username
      });


      $.ajax({
        url: '/api/users/instagramKey',
        data: { name: username },
        dataType: 'json',
        type: 'GET',
        success: function(data){
          //If received the user's access token back, change the instagram key to the 
          //user's token and chnage the label to be used in the URS to access_token
          self.setState({instgramKey: data, instgramTokenLabel: 'access_token='})
          // console.log(data);
          // var url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?' + self.state.instagramTokenLabel + self.state.instagramKey;
          // console.log("url", url);


            //Call to server to get leaders
            $.ajax({
              url: '/api/users/leaders',
              dataType: 'json',
              type: 'GET',
              success: function(data){
                  
                console.log(data);
                
              },
              error: function(xhr, status, error){
                console.error(xhr, status, error)
              }.bind(this) 
            })

        },
        error: function(xhr, status, error){
          console.error(xhr, status, error)
        }.bind(this) 
      })
    



      //Once have user's access_token (or defaulted to app's client_id, send an AJAX request to the server to get top scorers

      
      // When have top scorers, send an AJAX request to Instagram to get top scorers' feeds

      var url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?' + this.state.instagramTokenLabel + this.state.instagramKey;

        $.ajax({
          url: url,
          dataType: 'jsonp',
          type: 'GET',
          success: function(result){

            if(!result.data || !result.data.length){
                console.log("Error message from Instagram:", result.meta.error_message);
                return;
            }

            var pictures = result.data.map(function(p){

                return { 
                    id: p.id, 
                    url: p.link, 
                    src: p.images.low_resolution.url, 
                    title: p.caption ? p.caption.text : '', 
                    favorite: false 
                };

            });

            // Update the component's state. This will trigger a render.

            self.setState({ pictures: pictures });


          },
          error: function(xhr, status, error){
            console.error(xhr, status, error)
          }
        })
      },

  render: function() {

          var pictures = this.state.pictures.map(function(p){
              return <img ref={p.id} src={p.src} title={p.title} />
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



