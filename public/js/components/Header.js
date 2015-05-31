/* 
* @Author: nimi
* @Date:   2015-05-22 19:30:58
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-30 15:15:12
*/

'use strict';

var React = require('react/addons');
var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Header = React.createClass({
  mixins: [Router.State, Router.Navigation],

  // Parses querystring in URL
  getParameterByName: function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },

  getInitialState: function() {
    // and emit a change for this view component to update the username 

    if (this.getParameterByName('name')) {
      var username = this.getParameterByName('name');
      var token = this.getParameterByName('token');

      var data = {
        username: username,
        token: token
      };
      AuthActions.instagramSetCurrentUser(data);
    }
    return {};
  },

  _onChange: function() {
    this.setState ({
      username: AuthStore.getUser().username
    });
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },


  handleLogout: function(event) {
    AuthActions.logout();
    this.transitionTo('/login');
  },


  render: function() {


    if (window.localStorage.getItem('io.codergirl')) {

      return (
        <div className="grid-block shrink wrap">
          <div className="fullWidth">
            <div className="menu-group dark">
              <div className="menu-group left">
                <ul className="menu-bar dark" data-topbar role="navigation">
                  <li className="name">
                    <Link to="home">Coder Girl</Link>
                  </li>
                  <li>
                    <Link to="about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="menu-group-right">
                <ul className="menu-bar dark">
                  <li className="welcome-header">Get your code on, {this.state.username}</li>
                  <li className="logOut">
                    <button onClick={this.handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    } else {

      return (
        <div className="grid-block shrink wrap">
          <div className="fullWidth">
            <div className="menu-group dark">
              <div className="menu-group left">
                <ul className="menu-bar dark" data-topbar role="navigation">
                  <li className="name">
                    <Link to="home">Coder Girl</Link>
                  </li>
                  <li>
                    <Link to="about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="menu-group-right">
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});

var React = require('react/addons');
var CheckboxWithLabel = React.createClass({
  getInitialState: function() {
    return {
      isChecked: false
    };
  },
  onChange: function() {
    this.setState({
      isChecked: !this.state.isChecked
    });
  },
  render: function() {
    return (
      <label>
        <input type="checkbox" checked={this.state.isChecked} onChange={this.onChange} /> {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
});
// module.exports = CheckboxWithLabel;



module.exports = Header;
