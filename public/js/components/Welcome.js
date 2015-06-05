/* 
* @Author: Mark Bennett
* @Date:   2015-05-27 19:54:19
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-05 12:35:41
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');
var paper = require('../../../dist/bower_components/paper/dist/paper-full')

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Welcome = React.createClass({

  getInitialState: function() {
    return {
      user: {}
    }
  },

  _onChange : function(){
    this.setState ({
      user: AuthStore.getUser()
    })
  },

  componentDidMount: function() {
    var canvas = document.getElementById('welcomeBoard');
    var width = canvas.offsetWidth;

    // points will be equally distributed across x-axis
    var x = width/5;

    // create the points for the path
    var pointsCreator = function(distancebetweenPoints, numberofPoints){
      var results = []
      var direction = 1;
      var x = 20;
      var y = canvas.offsetHeight - 50;
      for(var i = 0; i <= numberofPoints; i++){
        direction*= -1; 
        var coordinates = {}
        coordinates.x = x;
        coordinates.y = y + (5*direction);
        results.push(coordinates);
        x+= distancebetweenPoints
        if(x >= width){
          x = width - 20;
        }
      }

      return results;
    }
     var points = pointsCreator(x, 5);
    paper.setup(canvas);

    var levelLine = new paper.Path();
    levelLine.strokeColor = 'black';
    levelLine.strokeWidth = 10;

    points.forEach(function(point){
      levelLine.add(new paper.Point(point.x, point.y))
      var circle = new paper.Path.Circle(new paper.Point(point.x, point.y), 10)
      circle.fillColor = 'white';
      circle.strokeColor = 'black'
    })

    levelLine.closed = false;
    levelLine.smooth();

    paper.view.draw()
    this.setState ({
      user: AuthStore.getUser()
    })
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var greeting = "Welcome";
    if (this.state.user.challengeNumber > 1) {
      greeting += " back";
    }

    return (
      <div className="welcome-container"> 
        <div className="welcome-title">
          {greeting}, <span className="welcome-username">{this.state.user.username}</span>
        </div> 
        <canvas id="welcomeBoard"> </canvas>
      </div>
    );
  }
});

module.exports = Welcome; 
