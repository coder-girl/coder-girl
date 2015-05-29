
'use strict';

var React = require('react/addons');
var AuthActions = require('../actions/AuthActions');
var Router = require('react-router');
var Link = Router.Link;
var AuthStore = require('../stores/AuthStore');

var Signup = React.createClass({


  displayName: 'Signup',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      username: null,
      email: '',
      password: '',
      country: ''
    };
  },

  handleSignup: function(event) {
    event.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    var passwordConfirm = React.findDOMNode(this.refs.passwordConfirm).value.trim();
    var country = React.findDOMNode(this.refs.country).value.trim();

    if(password !== passwordConfirm){

      alert("The passwords you entered do not match.  Please fix.")
    } else {

      AuthActions.signup(email, password, country);
    }

  },


  _onChange : function(){
    this.setState ({
      username: AuthStore.getUser()
    })
  },


  componentDidMount: function() {

    AuthStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },


  render: function() {

    if(window.localStorage.getItem('io.codergirl')) {
      this.transitionTo('/');
    }
    
    return (
      <div>
        <form onSubmit={this.handleSignup}>
          <div className="row">
            <div className="large-6 large-centered columns loginInDialog">
            <h5><a className="formSignInViaInstagram" href="/auth/instagram">Sign up through Instagram!</a></h5>
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
                    <label htmlFor="right-label" className="right inline">Country</label>
                  </div>
                  <div className="large-9 columns">
                    <input type="text" id="right-label" placeholder="Enter your country" ref="country" />
                  </div>
                </div>
                <div className="row">
                  <div className="large-3 columns">
                    <label htmlFor="right2-label" className="right inline"> Password</label>
                  </div>
                  <div className="large-9 columns">
                    <input type="password" id="right2-label" className="user-password" placeholder="Enter your password" ref="password" />
                  </div>
                  <div className="large-9 columns">
                    <input type="password" id="right2-label" className="user-password" placeholder="Enter your password again" ref="passwordConfirm" />
                  </div>
                </div>
                <div className="row">
                  <div className="large-12 columns">
                    <input type="submit" className="tiny success button right inline" value="Submit" />
                  </div>
                </div>
                <h6><Link className="formSignInViaInstagram" to="login">Login to existing account.</Link></h6>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Signup;