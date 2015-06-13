/* 
* @Author: Mark Bennett
* @Date:   2015-05-28 16:17:21
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-12 16:44:39
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Doughnut = require('react-chartjs').Doughnut;
var UserStore = require('../stores/UserStore');
var Chart = require('chart.js')

var calculateUserChartData = function(score, challengeNumber) {
  var data = UserStore.getLevel(score, challengeNumber);
  console.log(data);
  var percentageCompleted = data.percentageCompleted;
  var totalPercentage = data.totalPoints - percentageCompleted;
  var chartData = [
    {
      value: percentageCompleted,
      color: '#8E2BC8',
      highlight: '#8E2BC8'
    },
    {
      value: totalPercentage,
      color: '#5BC0BA',
      highlight: '#5BC0BA'
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
    var chart = this.getChart();
    console.log(chart);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
    //clear the canvas
    var canvas = document.getElementById('doughnut');
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
  },

  render: function() {
    Chart.defaults.global.responsive = true;
    var user = this.state.user;
    var level = UserStore.getLevel(user.score, user.challengeNumber).level;
    var data = calculateUserChartData(user.score, level);
    return (
      <div className= "congrats">
        <div className="congratsBanner">
            <p className= "congratsGreeting">Congratulations! You solved Challenge {user.challengeNumber - 1}!</p>
            <button className='continueButton'>
              <Link to="home" className="continueButton congratsContinue">Continue</Link>
            </button>
            <p className="scoreStats">Your total points: {user.score}</p>
            <p className="levelStats">Your current level: {level}</p>
          </div>
        <div className= "pieChart">
          <Doughnut id="doughnut" data={data}/>
        </div>
      </div>
    );
  }
});

module.exports = ChallengeComplete;
