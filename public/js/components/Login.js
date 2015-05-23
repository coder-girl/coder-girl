/* 
* @Author: nimi
* @Date:   2015-05-21 16:08:02
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 19:37:48
*/

'use strict';

var React = require('react/addons');
var Auth = require('../actions/AuthActions');

var Login = React.createClass({
  getInitialState: function(){
    return {
      email: "",
      password: ""
    };
  },

  handleLogin : function(event){
    event.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    Auth.login(email, password)
  },

  render : function(){
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <input className="user-email" placeholder="Enter your email" ref="email" />
          <input type="password" className="user-password" placeholder="Enter your password" ref="password" />
          <input type="submit" />
        </form>
        <a href="/auth/instagram"> Sign up through Insta </a>
      </div>
    );
  }
});

module.exports = Login;
