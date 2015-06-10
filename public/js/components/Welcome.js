/* 
 * @Author: Mark Bennett
 * @Date:   2015-05-27 19:54:19
 * @Last Modified by:   nimi
 * @Last Modified time: 2015-06-10 11:59:54
 */
'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');
var paper = require('../../../dist/bower_components/paper/dist/paper-full');
var animatePaper = require('../services/animatePaper.js');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Welcome = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    paper.install(window);
    return {
      user: {},
      hasUpdated: false
    };
  },

  _onChange: function() {
      if(this.isMounted()){
      this.setState ({
        user: AuthStore.getUser()
      });
    }
  },

  componentDidMount: function() {
    // this.forceUpdate();
    AuthStore.addChangeListener(this._onChange);
  },

  componentDidUpdate: function() {
    var self = this;
    if(!this.state.hasUpdated){

    if(this.state.user.username){
    var user = this.state.user
      
    var currentChallenge = this.state.user.challengeNumber;
    var canvas = document.getElementById('welcomeBoard');
    paper.setup(canvas);
    var width = canvas.offsetWidth;
    // points will be equally distributed across x-axis
    var distance = width / 5;
    var count =0; 

    // calculate which level set the user is on
    while(currentChallenge > 5){
      count++;
      currentChallenge-5
    }

    //reset the currentChallenge and make the the count a multiple of five for the level board
    
    count = (count*5) || 1;

    // create the points for the path
    var pointsCreator = function(distanceBetweenPoints, numberofPoints) {
      
      var results = [];
      var direction = 1;
      var x = distanceBetweenPoints / 2;
      var y = (7 * canvas.offsetHeight)/8;

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

    var points = pointsCreator(distance, 5);

    var levelLine = new paper.Path();
    levelLine.strokeColor = 'black';
    levelLine.strokeWidth = 5;
    levelLine.add(new paper.Point(0, (points[0].y - 20)));
    var houseURL = '../asset/house.png';
    var house = new paper.Raster(houseURL);
    house.onLoad = function() {
      var houseCenter = new paper.Point(width / 5, ((16 * canvas.offsetHeight) / 24))
      house.opacity = 0;
      house.scaling = 0.75;
      house.position = houseCenter
    };
    var girlURL = '../asset/girlWithPanda.png';
    var girl = new paper.Raster(girlURL);
    girl.onLoad = function() {
      girl.opacity = 0;
      girl.position = new paper.Point((width) / 2, (( 25* canvas.offsetHeight) / 32));
    };
    var treesURL = '../asset/trees.png';
    var trees = new paper.Raster(treesURL);
    trees.onLoad = function() {
      trees.opacity = 0;
      trees.position = new paper.Point((width*18) / 22, ((23*canvas.offsetHeight) / 32));
    };

    var nextURL = '../asset/rightarrow.png';

    var userBubblePath = "m 245.41842,595.31803 c 0,0 9.0884 ,-18.5276 -52.50162,-81.84478 -61.93879,-63.67572 -59.96515,-94.64594 -59.73994,-123.27872" +
    "0.29053,-36.93671 44.82182,-118.16526 106.05953,-119.90096 54.12684,-1.53415 115.70215,75.80676 115.56646,119.60555 -3.65588,90.09688 -68.26674, " +
    "132.12215 -109.38443,205.41891 z"
    var userBubble = new paper.Path(userBubblePath);
    userBubble.scaling = 0.22;
    userBubble.fillColor = '#FFDA08'

    userBubble.strokeColor = '#fe3a3a';
    userBubble.strokeWidth= 2;
    userBubble.position = new paper.Point(0 - (distance / 2), (points[0].y - 70));

    

    // add a path point and a circle at every point in the array, also add the level number (hardcoded in for now)
    points.forEach(function(point) {
      levelLine.add(new paper.Point(point.x, point.y));

      point.circle = new paper.Path.Circle(new paper.Point(point.x, point.y), 20);
      point.circle.fillColor = 'white';
      point.circle.strokeColor = 'black';
      point.level = new paper.PointText({
        point: [point.x - 6, point.y + 5],
        content: count,
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 20
      });
      count++;
    });

    // add next arrow and add click event 
    var nextArrowPath = "M 33.915647,52.070814 45.500001,40.581925 22.749999,40.570815 -4.6268657e-8,40.559705 l 0,-8.5 0,-8.5 L 22.749999,23.548595 " +
    "45.500001,23.537475 33.915647,12.048586 22.331293,0.55969741 l 11.096454,0 11.096454,0 15.2379,15.26172859 c 8.380845,8.39395 15.2379,15.711895 " +
    "15.2379,16.2621 0,0.550204 -6.867778,7.857427 -15.261728,16.238272 l -15.261728,15.2379 -11.072626,0 -11.072626,0 11.584354,-11.488888 z"
    var nextArrow = new paper.Path(nextArrowPath);
    nextArrow.position = new paper.Point((15*width)/16, (points[points.length-1].y + 60))
    nextArrow.fillColor = '#fe3a3a';
    nextArrow.onFrame = function(event){
      this.fillColor.hue+=1;
    }
    nextArrow.onClick = function(event){
      self.transitionTo('challenge')
    }



    //add click event on the circle of the currentChallenge
    points[currentChallenge-1].circle.onClick = function(event){
      self.transitionTo('challenge');
    }
    levelLine.add(new paper.Point((width - 1), (points[points.length - 1].y - 20)));

    levelLine.closed = false;
    levelLine.smooth();


    var counter = -1;

    (function next() {
      if (counter >= currentChallenge-2) {
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
          } else if (counter === 0) {
            house.animate({
              properties: {
                opacity: 1

              },
              settings: {
                duration: 1500,
                easing: 'easeInBounce'
              }
            });
          } else if (counter === 1) {
            girl.animate({
              properties: {
                opacity: 1
              },
              settings: {
                duration: 1500,
                easing: 'easeInBounce'
              }
            });
          } else if( counter === 3){
            trees.animate({
              properties: {
                opacity: 1
              },
              settings: {
                duration: 1500,
                easing: 'easeInBounce'
              }
            })
          }
          var overlayCircle = new paper.Path.Circle(new paper.Point(points[counter].x, points[counter].y), 20);
          overlayCircle.opacity = 0;
          overlayCircle.fillColor = '#fe3a3a';
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
              duration: 1200,
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
      })

    }, (currentChallenge+1 * 1500 + 100 /* the four will later be currentChallenge +1*/ ));
    paper.view.draw();
    }
    this.setState({
      hasUpdated: true
    })
    }

    
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var greeting = 'Welcome';
    if (this.state.user.challengeNumber > 1) {
      greeting += ' back';
    }

    $(document).bind('mousemove', function(e) {
      $('#butterflies').css({
        left: e.pageX - $('#welcomeBoard').width(),
        top: e.pageY - 50
      });
    }); 

    var smokeX = $('#welcomeBoard').width() - 27;

    $('#smoke').css({
      position: 'absolute',
      bottom: '-21%',
      right: smokeX,
      opacity: '0.2'
    });

    return (
      <div className="welcome-container">
        <div className="welcome-title">
          {greeting}, 
          <span className="welcome-username"> {this.state.user.username}</span>
        </div>
        <canvas id="welcomeBoard"></canvas>
        <div id="positionDivs">
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
              <div className="clouds cloud-4"></div>
              <div className="clouds cloud-3"></div>
              <div className="clouds cloud-6"></div>
              <div className="clouds cloud-5"></div>
            </div>
            <div id="cloud2" className="hidden">
              <div className="clouds cloud-4"></div>
              <div className="clouds cloud-2"></div>
              <div className="clouds cloud-6"></div>
              <div className="clouds cloud-1"></div>
            </div>
          </div>
          <div id="butterflies">
            <div className="borboletas">
              <div className="borboleta-1">
                <div className="borboleta-oval-squish">
                  <div className="borboleta-oval">
                    <div className="borboleta-radial">
                      <div className="borboleta-gfx">
                        <div className="borboleta-anim"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="borboleta-2">
                <div className="borboleta-oval-squish">
                  <div className="borboleta-oval">
                    <div className="borboleta-radial">
                      <div className="borboleta-gfx">
                        <div className="borboleta-anim"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Welcome;
