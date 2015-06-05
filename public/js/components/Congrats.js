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
var UserStore = require('../stores/UserStore');

var calculateUserChartData = function(score, challengeNumber) {
  var data = UserStore.getLevel(score, challengeNumber);
  console.log(data);
  var percentageCompleted = data.percentageCompleted;
  var totalPercentage = data.totalPoints - percentageCompleted;
  var chartData = [
    {
      value: percentageCompleted,
      color: '#8E2BC8',
      highlight: '#8E2BC8',
      label: 'Points Earned'
    },
    {
      value: totalPercentage,
      color: '#5BC0BA',
      highlight: '#5BC0BA',
      label: 'Points till Level Up'
    }
  ];

  return chartData;
};


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
    var level = UserStore.getLevel(user.score, user.challengeNumber).level;
    console.log('user', user)
    var data = calculateUserChartData(user.score, level);
    console.log(data);
    return (
      <div className="congrats-wrapper">
        <h1 className="congrats-title">
          Congratulations! You solved Challenge
          <span className="challenge-number"> {user.challengeNumber - 1}</span>
        </h1>
        <h3 className="congrats-user-score">Current score: {user.score} points</h3>
        <div id="challengeDiv">
          <Doughnut data={data} width="200" height="250" />
          <h3 className="current-user-level">Current Level: {level}</h3>
        </div>
        <Link to="challenge">Continue coding</Link>
      </div>
    );
  }
});

module.exports = ChallengeComplete;
