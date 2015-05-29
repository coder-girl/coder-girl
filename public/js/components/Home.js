var React = require('react');
var Leaderboard = require('./Leaderboard');
var ChallengeEditor = require('./ChallengeEditor');
var ChallengeInstructions = require('./ChallengeInstructions')
var Chat = require('./Chat');
var Router = require('react-router');
var Link = Router.Link;

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
      <div>
        <div className="row">
          <div className="small-6 large-6 columns">
            <ul>
              <li>
                <Link to="page1">Page 1</Link>
              </li>
              <li>
                <Link to="page2">Page 2</Link>
              </li>
            </ul>
            <Router.RouteHandler/>
          </div>
          <div className="small-4 large-4 columns">
            Editor
          </div>
          <div className="small-2 large-2 columns">
            Leaderboard
          </div>
        </div>
        <div className="row">
          Chat
        </div>
      </div>
    );
  }
});


var Page1 = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <ChallengeInstructions />
        </div>
        <div>
          <ChallengeEditor />
        </div>
        <div>
          <Leaderboard />
        </div>
      </div>
    );
  }
});


var Page2 = React.createClass({

  render: function() {
    return (
      <div>
        <Leaderboard />
      </div>
    );
  }
});

exports.Home = Home;
exports.Page1 = Page1;
exports.Page2 = Page2;
