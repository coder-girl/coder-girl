/* 
* @Author: nimi
* @Date:   2015-05-22 19:30:58
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-13 09:09:17
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

  handleLogout : function(event){
    AuthActions.logout();
    this.transitionTo('/login');
  },

  render: function() {
    var menuRight;
    var correctLink;

    if (this.state.username) {
      correctLink = "home";

      menuRight =  <div className="menu-group-right">
                    <ul className="menu-bar dark">
                      <li className="welcome-header">Get your code on, {this.state.username}</li>
                      <li className="logOut">
                        <button onClick={this.handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
      } else {
        menuRight = <div></div>
        correctLink = "login";
      }

      return (
        <div className="grid-block shrink wrap">
          <div className="fullWidth">
            <div className="menu-group dark">
              <div className="menu-group left">
                <ul className="menu-bar dark" data-topbar role="navigation">
                  <li id="icon">
                    <Link to={correctLink}><img className= "logo" id="logo" src="../asset/CoderGirl-WhiteBackground.png"></img></Link>
                  </li>
                  <li id="name">
                    <Link to={correctLink}> <span>Coder Girl</span></Link>
                  </li>
                  <li>
                    <Link to="about"><span>About</span></Link>
                  </li>
                </ul>
              </div>
              {menuRight}
            </div>
          </div>
        </div>
      );

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
