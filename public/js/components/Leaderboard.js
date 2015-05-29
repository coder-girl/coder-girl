'use strict';

var React = require('react/addons');
var LeaderboardActions = require('../actions/LeaderboardActions');
var LeaderboardStore = require('../stores/LeaderboardStore');
var Router = require('react-router');


var Leaderboard = React.createClass({

  displayName: 'Leader Board View',
  mixins: [Router.State, Router.Navigation],

  // Parses querystring in URL
  getParameterByName: function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },

  getInitialState: function(){   
    // The pictures array will be populated via AJAX
    //Default instagram key is app client id
    return { 
      pictures: [],
      username: ''
    };
  },

  _onChange : function(){
    this.setState ({
      pictures: LeaderboardStore.getPictures()
    });
  },

  componentDidMount: function(){

    LeaderboardStore.addChangeListener(this._onChange);
    var username = this.getParameterByName("name");

    this.setState({
      username: username
    });
    //If have a username in params, send an AJAX request to the server to get the signed in user's instagram access toekn.
    if(username){
      LeaderboardActions.getAccessToken(username);
    } else {
      //If don't have a user who signed in with instagram, just go ahead and get top scorers
      LeaderboardActions.getTopScorers();
    }
  },

  componentWillUnmount: function() {
    LeaderboardStore.removeChangeListener(this._onChange);
  },

  showUser: function(user){
    //Create function when mouseover image, show username.
    // console.log(user);
  },

  render: function() {

    if (!window.localStorage.getItem('io.codergirl')) {
      this.transitionTo('/login');
    }
    var self = this;
    var pictures = this.state.pictures.map(function(p){
      return (
        <li key={p.id}>
          <img onMouseOver={self.showUser.bind(null, p.user)} ref={p.id} src={p.src} title={p.title} />
        </li>
      )
    });

    if (!pictures.length){
      pictures = <p>Loading images...</p>;
    }

    return (
      <div className="leaderboard-container">
        <h4>Leaderboard</h4>
        <ul className="small-block-grid-2 medium-block-grid-3 large-block-grid-4"> {pictures} </ul>       
      </div>
    );
  }

});


module.exports = Leaderboard;


