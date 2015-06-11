/* 
* @Author: Mark Bennett
* @Date:   2015-05-28 16:17:21
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-11 09:48:58
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
    //clear the canvas
    var canvas = document.getElementById('doughnut');
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
  },

  render: function() {
    var user = this.state.user;
    var level = UserStore.getLevel(user.score, user.challengeNumber).level;
    console.log('user', user);
    var data = calculateUserChartData(user.score, level);
    console.log(data);
    return (
      <div className="congrats-wrapper">
          Congratulations! You solved Challenge
          <span className="challenge-number"> {user.challengeNumber - 1}</span>
        <div className="congrats-info">
          <h3 className="congrats-user-score">Score: {user.score}</h3>
          <h3 className="current-user-level">Level: {level}</h3>
        </div>
        <div id="challengeDiv">
          <Doughnut id="doughnut" data={data} />
        </div>
        <div className='continueButton'>
          <Link to="home" className="congratsContinue">Back to Home</Link>
        </div>
      </div>
    );
  }
});

module.exports = ChallengeComplete;
