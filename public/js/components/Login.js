/* 
* @Author: nimi
* @Date:   2015-05-21 16:08:02
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 19:37:48
*/

'use strict';

var React = require('react/addons');
var AuthActions = require('../actions/AuthActions');

var Login = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },

  handleLogin: function(event) {
    event.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    AuthActions.login(email, password);
  },


  render: function() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <div className="row">
            <div className="large-6 large-centered columns loginInDialog">
              <div className="formContainer">
                <div className="row">
                  <div className="large-3 columns">
                    <label htmlFor="right-label" className="right inline"> Email</label>
                  </div>
                  <div className="large-9 columns">
                    <input type="email" id="right-label" className="user-email" placeholder="Enter your email" ref="email" />
                  </div>
                </div>
                <div className="row">
                  <div className="large-3 columns">
                    <label htmlFor="right2-label" className="right inline"> Password</label>
                  </div>
                  <div className="large-9 columns">
                    <input type="password" id="right2-label" className="user-password" placeholder="Enter your password" ref="password" />
                  </div>
                </div>
                <div className="row">
                  <div className="large-12 columns">
                    <a className="formSignInViaInstagram" href="/auth/instagram">Sign up through Instagram!</a>
                    <input type="submit" className="tiny success button right inline" value="Sumbit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Login;
