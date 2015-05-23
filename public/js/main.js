/* 
* @Author: nimi
* @Date:   2015-05-21 12:47:03
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 19:49:45
*/

'use strict';

$(document).ready(function() {

  var React = require('react');
  var Router = require('react-router');
  var App = require('./app.js');
  var Login = require('./components/Login')
  var Header = require('./components/Header')
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;
  var NotFoundRoute = Router.NotFoundRoute;
  var RouteHandler = Router.RouteHandler;
  var Link = Router.Link;


  var Main = React.createClass({
    render: function() {
      return (
        <div>
          <Header />
          <RouteHandler/>
        </div>
      );
    }
  })

  var routes = (
    <Route handler={Main} path= "/">
      <DefaultRoute handler={Login}/>
      <Route name="login" path="/login" handler={Login}/>
      <NotFoundRoute handler={Login}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
  });

});
