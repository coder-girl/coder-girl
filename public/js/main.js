/* 
* @Author: nimi
* @Date:   2015-05-21 12:47:03
* @Last Modified time: 2015-06-15 16:42:43
*/

'use strict';

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Home = require('./components/Home');
var Header = require('./components/Header');

var About = require('./components/About');
var Signup = require('./components/Signup');
var Login = require('./components/Login');
var Congrats = require('./components/Congrats');
var Welcome = require('./components/Welcome');
var Challenge = require('./components/Challenge');
var MobileMessage = require('./components/MobileMessage');

var Main = React.createClass({
  render: function() {
    return (
      <div className="grid-frame">
        <div className="vertical grid-block">
          <Header/>
          <div className="main-content grid-block">
            <RouteHandler/>
          </div>
          <MobileMessage />
        </div>
      </div>
    );
  }
});

var routes = (
<Route handler={Main} path="/">
  <Route name="about" path="/about" handler={About}/>
  <Route name="login" path="/login" handler={Login}/>
  <Route name="signup" path="/signup" handler={Signup}/>
  <Route name="home" path="/home" handler={Home}>
    <Route name="challenge" handler={Challenge}/>
    <Route name="congrats" handler={Congrats}/>
    <DefaultRoute name="welcome" handler={Welcome}/>
  </Route>
  <DefaultRoute handler={Login}/>
  <Router.NotFoundRoute handler={Login}/>
</Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
