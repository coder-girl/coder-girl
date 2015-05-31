/* 
* @Author: nimi
* @Date:   2015-05-21 16:08:02
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-30 17:31:04
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

      <div className="grid-block login">
        <div className="grid-content">
          <div className="grid-container">
            <form onSubmit={this.handleLogin} className="formContainer">
            <button className='instagramButton button'>
              <a className="instagramIcon"href="/auth/instagram"><i className="fa fa-instagram fa-3x"></i></a>
              <a> <span>Log in with Instagram!</span> </a>
            </button>
              <input type="email" id="right-label" className="user-email" placeholder="Enter your email" ref="email" />
              <input type="password" id="right2-label" className="user-password" placeholder="Enter your password" ref="password" />
              <input type="submit" className="loginButton button" value="Log in!" align="right" />
              <p className="signUpLink">
                <Link to="signup">No account? Join up to get your code on!</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = Login;
