/* 
* @Author: Mark Bennett
* @Date:   2015-05-28 16:17:21
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-30 16:45:02
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Doughnut = require('react-chartjs').Doughnut;

var chartData = [
  {
    value: 450,
    color: '#8E2BC8',

    highlight: '#8E2BC8',
    label: 'Points Earned'
  },
  {
    value: 300,
    color: '#5BC0BA',
    highlight: '#5BC0BA',
    label: 'Points till Level Up'
  }
];

var MyComponent = React.createClass({
  render: function() {
    return <Doughnut data={chartData} width="200" height="250" />;
  }
});

var ChallengeComplete = React.createClass({

  getInitialState: function() {
    return {
      user: {}
    };
  },

  _onChange: function() {
    this.setState ({
      user: AuthStore.getUser()
    });
  },

  componentDidMount: function() {
    this.setState ({
      user: AuthStore.getUser()
    });
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var user = this.state.user;
    return (
      <div className="congrats-wrapper">
        <h1 className="congrats-title">
          Congratulations! You solved Challenge
          <span className="congrats-level">{user.level - 1}</span>
        </h1>
        <h3 className="congrats-user-score">Current score: {user.score} points</h3>
        <div id="challengeDiv">
          <Doughnut data={chartData} width="200" height="250" />
          <h3 className="currentLevel">{user.level - 1}</h3>
        </div>
        <Link to="challenge">Continue coding</Link>
      </div>
    );
  }
});

module.exports = ChallengeComplete;
