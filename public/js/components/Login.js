/* 
* @Author: nimi
* @Date:   2015-05-21 16:08:02
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-13 09:31:46
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
    AuthActions.isAuth(window.localStorage.getItem('io.codergirl'));

    return {
      user: {},
      error: null
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
      user: AuthStore.getUser(),
      error: AuthStore.getLoginError()
    });
    if(this.state.user.isAuth){
      this.transitionTo('/home');
    }
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthActions.clearErrors();
    AuthStore.removeChangeListener(this._onChange);
  },

  clearError: function() {
    this.setState({
      error: null
    });
  },

  render: function() {

    var error = this.state.error ? <div className="auth-error login-error"><p>{this.state.error}</p></div> : null;

    return (

      <div className="grid-block login">
        <div className="grid-content">
          <div className="grid-container">
            <form onSubmit={this.handleLogin} className="formContainer">
              <a className="instagramLogin" href= '/auth/instagram'> <i className="fa fa-instagram fa-3x"></i><span>Log in with Instagram!</span> </a>
              <input type="email" id="right-label" className="user-email" onChange={this.clearError} placeholder="Enter your email" ref="email" />
              <input type="password" id="right2-label" className="user-password" onChange={this.clearError} placeholder="Enter your password" ref="password" />
              { error }
              <input type="submit" className="loginButton button" value="Log in!" align="right" />
              <Link to="signup" className="signUpLink"><div>No account?</div><div className="joinUp">Join up to get your code on!</div></Link>
            </form>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = Login;
