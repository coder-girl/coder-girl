/* 
* @Author: Mark Bennett
* @Date:   2015-05-28 20:56:52
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 12:20:07
*/

'use strict';

var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ChallengeEditor = require('./ChallengeEditor');
var ChallengeInstructions = require('./ChallengeInstructions');

var Challenge = React.createClass({

  render: function() {
    return (
      <div className="horizontal grid-block">
        <div className="medium-6 grid-block marginTop10 marginLeft10">
          <ChallengeInstructions/>
        </div>
        <div className="medium-6 grid-block marginTop10">
          <ChallengeEditor/>
        </div>
      </div>
    );
  }
});

module.exports = Challenge;
