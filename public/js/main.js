/* 
* @Author: nimi
* @Date:   2015-05-21 12:47:03
* @Last Modified time: 2015-05-29 12:17:08
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

  <Route name="home" path="/" handler={Home}>

    <Route name="challenge" path="/challenge" handler={Challenge}/>
    <Route name="congrats" path="/congrats" handler={Congrats}/>

    <DefaultRoute name="welcome" handler={Welcome}/>

  </Route>

  <DefaultRoute handler={Home}/>
  <Router.NotFoundRoute handler={Home}/>

</Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
