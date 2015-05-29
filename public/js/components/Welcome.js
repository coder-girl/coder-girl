/* 
* @Author: Mark Bennett
* @Date:   2015-05-27 19:54:19
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 14:59:08
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');

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
    this.setState ({
      user: AuthStore.getUser()
    })
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    // console.log("USER LINE 41: ", user);

    return (
      <div className="welcome-container"> 
        <h1 className="welcome-title">
          Welcome back, <span className="welcome-username">{this.state.user.username}</span>
        </h1> 
        <div className="welcome-user-level">Level: {this.state.user.level}</div>
        <div className="welcome-user-score">Score: {this.state.user.score} points</div>
        <Link to="challenge">Continue coding</Link>
      </div>
    );
  }
});

module.exports = Welcome; 