var React = require('react');
var Leaderboard = require('./Leaderboard');
var ChallengeEditor = require('./ChallengeEditor');
var ChallengeInstructions = require('./ChallengeInstructions')
var Chat = require('./Chat');

var AuthStore = require('../stores/AuthStore');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({

  contextTypes: {
    router: React.PropTypes.func 
  },

  displayName: 'Home',
  mixins: [Router.State, Router.Navigation],

  render: function() {

    var name = this.context.router.getCurrentPath();

    if (!window.localStorage.getItem('io.codergirl')) {
      this.transitionTo('/login');
    }

    return (
      <div className="home-container">
        <RouteHandler/> 
        <Leaderboard/>
        <Chat/> 
      </div>
    );
  }
});

module.exports = Home;
