/* 
<<<<<<< HEAD
 * @Author: Mark Bennett
 * @Date:   2015-05-27 19:54:19
 * @Last Modified by:   nimi
 * @Last Modified time: 2015-06-06 16:58:29
 */

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');
var paper = require('../../../dist/bower_components/paper/dist/paper-full');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Welcome = React.createClass({

  getInitialState: function() {
    return {
      user: {}
    };
  },

  _onChange: function() {
    this.setState({
      user: AuthStore.getUser()
    });
  },

  componentDidMount: function() {
    var canvas = document.getElementById('welcomeBoard');
    var width = canvas.offsetWidth;
    // points will be equally distributed across x-axis
    var distance = width/5;

    // create the points for the path
    var pointsCreator = function(distanceBetweenPoints, numberofPoints){
      var results = []
      var direction = 1;
      var x = distanceBetweenPoints/2;
      var y = canvas.offsetHeight - 50;
      for(var i = 0; i < numberofPoints; i++){
        direction*= -1; 
        var coordinates = {}
        coordinates.x = x;
        coordinates.y = y + (10*direction);
        results.push(coordinates);
        x+= distanceBetweenPoints
        if(x >= width){
          x = width - (distanceBetweenPoints/2)
        }
      }

      return results;
    }
     var points = pointsCreator(distance, 5);
    paper.setup(canvas);

    var levelLine = new paper.Path();
    levelLine.strokeColor = 'black';
    levelLine.strokeWidth = 10;
    levelLine.add(new paper.Point(0, (points[0].y-20)))

    points.forEach(function(point){
      levelLine.add(new paper.Point(point.x, point.y))
      var circle = new paper.Path.Circle(new paper.Point(point.x, point.y), 20)
      circle.fillColor = 'white';
      circle.strokeColor = 'black';
    });

    levelLine.add(new paper.Point((width-1), (points[points.length-1].y - 20)))

    levelLine.closed = false;
    levelLine.smooth();

    paper.view.draw();
    this.setState({
      user: AuthStore.getUser()
    });
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var greeting = 'Welcome';
    if (this.state.user.challengeNumber > 1) {
      greeting += ' back';
    }

    return (
      <div className="welcome-container">
        <div className="welcome-title">
          {greeting},
          <span className="welcome-username">{this.state.user.username}</span>
        </div>
        <canvas id="welcomeBoard"></canvas>
        <div className="sun">
          <div className="sun-face">
            <div className="sun-hlight"></div>
            <div className="sun-leye"></div>
            <div className="sun-reye"></div>
            <div className="sun-lred"></div>
            <div className="sun-rred"></div>
            <div className="sun-nose"></div>
          </div>
          <div className="sun-anime">
            <div className="sun-ball"></div>
          </div>
        </div>
        <div id="cloud">
          <div className="clouds cloud-1"></div>
        </div>
      </div>
    );
  }
});

module.exports = Welcome;
