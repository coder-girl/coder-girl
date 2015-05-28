/* 
* @Author: Mark Bennett
* @Date:   2015-05-27 19:54:19
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 14:36:37
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');

var Welcome = React.createClass({
  render: function() {
    var user = AuthStore.getUser();
    return (
      <div className="welcome-wrapper"> 
        <h1>WELCOME VIEW COMPONENT</h1> 
        <button onClick="someFuncInChallengeActions.js">Continue coding</button>
      </div>
    )
  }
});