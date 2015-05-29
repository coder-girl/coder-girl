/* 
* @Author: nimi
* @Date:   2015-05-21 12:47:03
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 16:53:00
*/

'use strict';

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Home = require('./components/Home').Home;
var Page1 = require('./components/Home').Page1;
var Page2 = require('./components/Home').Page2;
var Header = require('./components/Header');
// var Logout = require('./components/Logout');
var CodeLabViewWrapper = require('./views/codeLabView').CodeLabViewWrapper;
var LeaderBoardViewWrapper = require('./views/leaderBoardView').LeaderBoardViewWrapper;
var LoginViewWrapper = require('./views/loginView').LoginViewWrapper;
var AboutViewWrapper = require('./views/aboutView').AboutViewWrapper;
var SignupViewWrapper = require('./views/signupView').SignupViewWrapper;


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
  <Route name="codeLab" path="/codeLab" handler={CodeLabViewWrapper( "Code Lab View")}/>
  <Route name="about" path="/about" handler={AboutViewWrapper( "About View")}/>
  <Route name="leaderBoard" path="/leaderBoard" handler={LeaderBoardViewWrapper( "Leader Board View")}/>
  <Route name="login" path="/login" handler={LoginViewWrapper( "Login View")}/>
  <Route name="signup" path="/signup" handler={SignupViewWrapper( "Signup View")}/>
  <Route name="home" handler={Home}>
    <Route name="page1" handler={Page1}/>
    <Route name="page2" handler={Page2}/>
  </Route>
  <Router.NotFoundRoute handler={Home}/>
</Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
