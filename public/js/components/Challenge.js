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
var ChallengeInstructions = require('./ChallengeInstructions')

var Challenge = React.createClass({

  render: function() {
    return (
      <div className="grid-block">
        <h4>Challenge</h4>
        <ChallengeInstructions/> 
        <ChallengeEditor/>
      </div>
    );
  }
});

module.exports = Challenge;
