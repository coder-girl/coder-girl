/* 
<<<<<<< HEAD
 * @Author: Mark Bennett
 * @Date:   2015-05-27 19:54:19
 * @Last Modified by:   nimi
 * @Last Modified time: 2015-06-06 17:00:59
 */

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');
var paper = require('../../../dist/bower_components/paper/dist/paper-full')
var animatePaper = require('../services/animatePaper.js')

console.log('animate', animatePaper)
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
    })
    
  },

  componentDidMount: function() {
    var user = AuthStore.getUser()
    console.log(user)
    var canvas = document.getElementById('welcomeBoard');
    var project = paper.setup(canvas);
    var width = canvas.offsetWidth;
    var count = 1;
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

    var levelLine = new paper.Path();
    levelLine.strokeColor = 'black';
    levelLine.strokeWidth = 10;
    levelLine.add(new paper.Point(0, (points[0].y-20)))

    // add a path point and a circle at every point in the array, also add the level number (hardcoded in for now)
    points.forEach(function(point){
      levelLine.add(new paper.Point(point.x, point.y))

      point.circle = new paper.Path.Circle(new paper.Point(point.x, point.y), 20);
      point.circle.fillColor = 'white';
      point.circle.strokeColor = 'black'
      point.level= new paper.PointText({
        point: [point.x-5, point.y+5],
        content: count,
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 20
      });
      count++
    })

    levelLine.add(new paper.Point((width-1), (points[points.length-1].y - 20)))

    levelLine.closed = false;
    levelLine.smooth();

    //animate to the current challenge
    //
    //loop through points until you get to the current challenge
    //fill in each circle with blue
    //do a cool shakey thing
    //move on
    
    var counter = -1;
    (function next() {
    if (counter >= 2) return;

    setTimeout(function() {
      var overlayCircle =  new paper.Path.Circle(new paper.Point(points[counter].x, points[counter].y), 20)
      overlayCircle.opacity = 0;
      overlayCircle.fillColor = '#5BC0BA'
      overlayCircle.animate({
      properties: {
        opacity:1
      },
      settings: {
        duration: 2000,
        easing: "swing"
      }
    });
        next();
    }, 1000);
    counter++
  })();
    

    paper.view.draw()
    this.setState ({
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
