/* 
* @Author: nimi
* @Date:   2015-05-21 16:08:02
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 10:25:09
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
        <form onSubmit={this.handleLogin}>
          <div className="row">
            <div className="large-6 large-centered columns loginInDialog">
            <h5><a className="formSignInViaInstagram" href="/auth/instagram">Login through Instagram!</a></h5>
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
                    <p><Link to="signup">Sign up for a new Coder Girl account</Link></p>
                    <input type="submit" className="tiny success button right inline" value="Submit" />
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
