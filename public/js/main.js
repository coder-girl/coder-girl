/* 
* @Author: nimi
* @Date:   2015-05-21 12:47:03
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 12:29:28
*/

'use strict';

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Home = require('./components/Home.js');
var Data = require('./model/navData');
var navItems = Data.navItems;
// var App = require('./app.js');
var Header = require('./components/Header');
var Logout = require('./components/Logout');
var CodeLabViewWrapper = require('./views/codeLabView').CodeLabViewWrapper;
var LeaderBoardViewWrapper = require('./views/leaderBoardView').LeaderBoardViewWrapper;
var LoginViewWrapper = require('./views/LoginView').LoginViewWrapper;


var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Header navItems={navItems} />
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
  <Route name="leaderBoard" path="/leaderBoard" handler={LeaderBoardViewWrapper( "Leader Board View")}/>
  <Route name="login" path="/login" handler={LoginViewWrapper( "Login View")}/>
  <DefaultRoute name="home" handler={Home}/>
</Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});



