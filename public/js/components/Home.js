var React = require('react');
var Leaderboard = require('./Leaderboard');
var ChallengeEditor = require('./ChallengeEditor');
var ChallengeInstructions = require('./ChallengeInstructions')
var Chat = require('./Chat');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({

  contextTypes: {
    router: React.PropTypes.func // 
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
        <div className="row">
          <div className="small-6 large-6 columns"> <RouteHandler /> </div>
          <div className="small-2 large-2 columns"> <Leaderboard /> </div>
        </div>

        <div className="row">
          <div className="small-4 large-4 columns"> <Chat /> </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
