var React = require('react');
var Leaderboard = require('./Leaderboard');
var Chat = require('./Chat');
var Router = require('react-router');


var Home = React.createClass({
  displayName: 'Home',
  mixins: [Router.State, Router.Navigation],


  render: function() {

    if(!window.localStorage.getItem('io.codergirl')) {
      this.transitionTo('/login');
    }

    return (
      <div>


      <div className="row">
        <div className="small-6 large-6 columns">Challenge</div>
        <div className="small-4 large-4 columns">Editor</div>
        <div className="small-2 large-2 columns"> <Leaderboard /></div>
      </div>

      <div className="row">
        Chat
        <Chat />
      </div>

      </div>
    );
  }
});

module.exports = Home;
