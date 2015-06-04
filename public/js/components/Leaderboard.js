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

    var self = this;
    var evens = this.state.pictures.filter(function(item, index){ return index % 2 === 0});
    var odds = this.state.pictures.filter(function(item, index){return index %2 !== 0});


    var evenPictures = evens.map(function(p){
      return (
        <li key={p.id} className="card-list-item">
          <div className="custom-card">
            <img onMouseOver={self.showUser.bind(null, p.instagramUsername)} ref={p.id} src={p.src} title={p.title} />
            <div className="custom-card-divider">
              <div>{p.username}</div>
              <div>{p.score} Points</div>
            </div>
          </div>
        </li>
      )
    });



    var oddPictures = odds.map(function(p){
      return (
        <li key={p.id}>
          <div className="custom-card">
            <img onMouseOver={self.showUser.bind(null, p.instagramUsername)} ref={p.id} src={p.src} title={p.title} />
            <div className="custom-card-divider">
              <div>{p.username}</div>
              <div>{p.score} Points</div>
            </div>
          </div>
        </li>
      )
    });

    if (!evenPictures.length){
      evenPictures = <p>Loading images...</p>;
    }

    return (
      <div className="leaderboard-container">
        <h4 className="leaderboard-header">Leaderboard</h4>
        <div className="grid-block">
          <div classNaem="grid-block">
            <ul className="grid-content"> {evenPictures} </ul>
          </div>
          <div className="grid-block">
            <ul className="grid-content"> {oddPictures}</ul> 
          </div> 
        </div>     
      </div>
    );
  }

});


module.exports = Leaderboard;




