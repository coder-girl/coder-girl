/* 
* @Author: nimi
* @Date:   2015-05-21 16:08:02
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 17:38:05
*/

'use strict';

var React = require('react/addons');
var AuthActions = require('../actions/AuthActions');
var Router = require('react-router');
var Link = Router.Link;
var AuthStore = require('../stores/AuthStore');

var Login = React.createClass({


  displayName: 'Login',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      email: '',
      password: '',
      username: null
    };
  },

  handleLogin: function(event) {
    event.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    AuthActions.login(email, password);
  },

  _onChange: function() {
    this.setState ({
      username: AuthStore.getUser()
    });
  },


  componentDidMount: function() {

    AuthStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },


  render: function() {

    if (window.localStorage.getItem('io.codergirl')) {
      this.transitionTo('/');
    }

    return (

      <div className="grid-block login test2">
        <div className="grid-content">
          <div className="grid-container">
            <form onSubmit={this.handleLogin}>
              <label htmlFor="right-label" className="right inline"> Email</label>
              <input type="email" id="right-label" className="user-email" placeholder="Enter your email" ref="email" />
              <label htmlFor="right2-label" className="right inline"> Password</label>
              <input type="password" id="right2-label" className="user-password" placeholder="Enter your password" ref="password" />
              <a className="formSignInViaInstagram" href="/auth/instagram">Sign up through Instagram!</a>
              <p>
                <Link to="signup">Sign up for a new Coder Girl account</Link>
              </p>
              <input type="submit" className="tiny success button right inline" value="Sumbit" />
            </form>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = Login;
