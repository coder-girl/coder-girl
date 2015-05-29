/* 
* @Author: Mark Bennett
* @Date:   2015-05-28 16:17:21
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 11:42:21
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ChallengeComplete = React.createClass({

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
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var user = this.state.user;
    return (
      <div className="congrats-wrapper"> 
        <h1 className="congrats-title">
          Congratulations! You solved Challenge <span className="congrats-level">{user.level}</span>
        </h1> 
        <h3 className="congrats-user-score">Current score: {user.score} points</h3>
        <Link to="challenge">Continue coding</Link>
      </div>
    )
  }
});

module.exports = ChallengeComplete; 
