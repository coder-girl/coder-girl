/* 
* @Author: nimi
* @Date:   2015-05-22 19:30:58
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 12:20:21
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
var LeaderBoardViewWrapper = require('../views/leaderBoardView').LeaderBoardViewWrapper;

var Header = React.createClass({
  mixins: [Router.State, Router.Navigation],

  //Parses querystring in URL
  getParameterByName: function(name){
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },

  getInitialState: function(){
    return {
      username: null
    };
  },

  _onChange : function(){
    this.setState ({
      username: AuthStore.getUser().name
    })
  },

  componentDidMount: function() {

    AuthStore.addChangeListener(this._onChange);
    //If user logged in via instagram, build object with username and token from 
    //params and call action to set the current user.  The AuthStore will then set the cookie 
    // and emit a change for this view component to update the username 

    if(this.getParameterByName("name")){
      var username = this.getParameterByName("name");
      var token = this.getParameterByName("token");
    
      var data = {
        username: username,
        token: token
      }

      AuthActions.instagramSetCurrentUser(data);
  
    };

  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },


  handleLogout : function(event){
    AuthActions.logout();
    this.transitionTo('/login');
  },


  render: function() {


    if (window.localStorage.getItem('io.codergirl')) {

      return (
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1>
                <Link to="home">Coder Girl</Link>
              </h1>
            </li>
          </ul>
          <section className="top-bar-section">
            <ul className="left">
              <li>
                <Link to="about">About</Link>
              </li>
            </ul>
            <ul className="right">
              <li className="welcome-header">Get your code on, {this.state.username}</li>
              <li><button onClick={this.handleLogout}>Logout</button></li>
            </ul>
          </section>
        </nav>
      );

    }

    else {

      return (
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1>
                <Link to="home">Coder Girl</Link>
              </h1>
            </li>
          </ul>
          <section className="top-bar-section">
            <ul className="left">
              <li>
                <Link to="about">About</Link>
              </li>
            </ul>
          </section>
        </nav>
      );
    }
  }
});

var React = require('react/addons');
var CheckboxWithLabel = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
  },
  render: function() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
});
// module.exports = CheckboxWithLabel;



module.exports = Header;
