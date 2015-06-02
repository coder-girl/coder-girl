/* 
* @Author: Mark Bennett
* @Date:   2015-05-27 19:54:19
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-30 16:50:51
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
    var greeting = "Welcome";
    if (this.state.user.level > 1) {
      greeting += " back";
    }

    return (
      <div className="welcome-container"> 
        <h1 className="welcome-title">
          {greeting}, <span className="welcome-username">{this.state.user.username}</span>
        </h1> 
        <div className="welcome-user-level">Level: {this.state.user.level - 1}</div>
        <div className="welcome-user-score">Score: {this.state.user.score} points</div>
        <Link to="challenge" className="link-to-code">Continue coding</Link>
      </div>
    );
  }
});

module.exports = Welcome; 