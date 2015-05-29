/* 
* @Author: nimi
* @Date:   2015-05-21 12:47:03
<<<<<<< HEAD
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 12:07:42
=======
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 08:57:01
>>>>>>> (refactor) Refactor components and main.js to utilize react-router
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

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <div className="main-content">
          <RouteHandler/>
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

  <DefaultRoute name="home" handler={Home}>

    <Route name="challenge" path="/challenge/:challengeId" handler={Challenge}/>
    <Route name="congrats" path="/congrats" handler={Congrats}/>

    <DefaultRoute name="welcome" handler={Welcome}/>

  </DefaultRoute>
  <Router.NotFoundRoute handler={Home}/>

</Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
