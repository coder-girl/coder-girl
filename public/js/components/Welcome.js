/* 
<<<<<<< HEAD
<<<<<<< HEAD
 * @Author: Mark Bennett
 * @Date:   2015-05-27 19:54:19
 * @Last Modified by:   nimi
 * @Last Modified time: 2015-06-06 17:01:30
 */

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');
var paper = require('../../../dist/bower_components/paper/dist/paper-full');
var animatePaper = require('../services/animatePaper.js');

console.log('animate', animatePaper);
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
    paper.install(window);
    var user = AuthStore.getUser();
    console.log(user);
    var canvas = document.getElementById('welcomeBoard');
    paper.setup(canvas);
    var width = canvas.offsetWidth;
    var count = 1;
    // points will be equally distributed across x-axis
    var distance = width / 5;

    // create the points for the path
    var pointsCreator = function(distanceBetweenPoints, numberofPoints) {
      var results = [];
      var direction = 1;
      var x = distanceBetweenPoints / 2;
      var y = canvas.offsetHeight - 50;

      for (var i = 0; i < numberofPoints; i++) {
        direction *= -1;
        var coordinates = {};
        coordinates.x = x;
        coordinates.y = y + (10 * direction);
        results.push(coordinates);
        x += distanceBetweenPoints;
        if (x >= width) {
          x = width - (distanceBetweenPoints / 2);
        }
      }

      return results;
    };

    // this function will take in path data and create the objects for the screen from svg pathData
    var pathCreator = function(pathData) {
      var path = new paper.Path(pathData);
      return path;
    };



    var points = pointsCreator(distance, 5);

    var levelLine = new paper.Path();
    levelLine.strokeColor = 'black';
    levelLine.strokeWidth = 10;
    levelLine.add(new paper.Point(0, (points[0].y - 20)));
    var userBubble = pathCreator('m 245.41842,595.31803 c 0,0 9.0884,-18.5276 -52.50162,-81.84478 -61.93879,-63.67572 -59.96515,-94.64594 -59.73994,-123.27872 0.29053,-36.93671 44.82182,-118.16526 106.05953,-119.90096 54.12684,-1.53415 115.70215,75.80676 115.56646,119.60555 -3.65588,90.09688 -68.26674,132.12215 -109.38443,205.41891 z');
    userBubble.scaling = 0.22;
    userBubble.fillColor = '#8E2BC8';
    userBubble.strokeColor = '#5BC0BA';
    userBubble.strokeWidth = 2;
    userBubble.position = new paper.Point(0 - (distance / 2), (points[0].y - 70));

    // add a path point and a circle at every point in the array, also add the level number (hardcoded in for now)
    points.forEach(function(point) {
      levelLine.add(new paper.Point(point.x, point.y));

      point.circle = new paper.Path.Circle(new paper.Point(point.x, point.y), 20);
      point.circle.fillColor = 'white';
      point.circle.strokeColor = 'black';
      point.level = new paper.PointText({
        point: [point.x - 5, point.y + 5],
        content: count,
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 20
      });
      count++;
    });

    levelLine.add(new paper.Point((width - 1), (points[points.length - 1].y - 20)));

    levelLine.closed = false;
    levelLine.smooth();

    var counter = -1;
    (function next() {
      if (counter >= 2) {
        return;
      } else {
        setTimeout(function() {
          if (counter === 2) {
            var sun = document.getElementById('happySun');
            for (var i = 0; i < sun.children.length; i++) {
              if (sun.children[i].classList.contains('hidden')) {
                sun.children[i].classList.remove('hidden');
              }
            }
          }

          var overlayCircle = new paper.Path.Circle(new paper.Point(points[counter].x, points[counter].y), 20);
          overlayCircle.opacity = 0;
          overlayCircle.fillColor = '#5BC0BA';
          overlayCircle.animate({
            properties: {
              opacity: 1
            },
            settings: {
              duration: 1500,
              easing: 'swing'
            }
          });
          userBubble.animate({
            properties: {
              position: {
                x: '+' + distance,
                y: points[counter].y - 70
              }
            },
            settings: {
              duration: 1500,
              easing: 'swing'
            }
          });
          next();
        }, 1500);
        counter++;
      }
    })();

    setTimeout(function() {
      userBubble.animate({
        properties: {
          position: {
            x: '+' + distance,
            y: points[counter + 1].y - 70
          }
        },
        settings: {
          duration: 1500,
          easing: 'swing'
        }
      });
    }, 6100);
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
        <div id="happySun">
          <div className="sun hidden">
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
          <div id="cloud" className="hidden">
            <div className="clouds cloud-1"></div>
            <div className="clouds cloud-2"></div>
            <div className="clouds cloud-3"></div>
            <div className="clouds cloud-4"></div>
            <div className="clouds cloud-5"></div>
            <div className="clouds cloud-6"></div>
          </div>
          <div id="cloud2" className="hidden">
            <div className="clouds cloud-1"></div>
            <div className="clouds cloud-2"></div>
            <div className="clouds cloud-3"></div>
            <div className="clouds cloud-4"></div>
            <div className="clouds cloud-5"></div>
            <div className="clouds cloud-6"></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Welcome;
