/* 
* @Author: Mark Bennett
* @Date:   2015-05-27 19:54:19
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 16:27:33
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');

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
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var user = this.state.user;
    console.log("USER: ", user);
    return (
      <div className="welcome-wrapper"> 
        <h1 className="welcome-title">
          Welcome back, <span className="welcome-username">{user.username}</span>
        </h1> 
        <div className="welcome-user-level">Level: {user.level}</div>
        <div className="welcome-user-score">Score: {user.score} points</div>
        <button className="welcome-proceed-to-challenge proceed-to-challenge">Continue coding</button>
      </div>
    )
  }
});

module.exports = Welcome; 