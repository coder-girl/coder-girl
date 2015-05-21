/* 
* @Author: nimi
* @Date:   2015-05-21 16:08:02
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-21 16:38:46
*/

'use strict';

var React = require('react/addons');
var Auth = require('../services/Auth');

var Login = React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: ''
    };
  },

  handleLogin : function(event){
    event.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    Auth.login(email, password)
      .catch(function(error){
        console.error("There was an error logging in", error);
      })
  },

  render : function(){
    return (
      <form onSubmit={this.handleLogin}>
        <input className="user-email" placeholder="Enter your email" ref="email" />
        <input className="user-password" placeholder="Enter your password" ref="password" />
      </form>
    );
  }
});

React.render(<Login />, document.getElementByClassName("app"));
