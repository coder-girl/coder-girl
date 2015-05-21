/* 
* @Author: nimi
* @Date:   2015-05-21 12:47:03
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-21 16:46:04
*/

'use strict';

$(document).ready(function() {

  var React = require('react');
  var Router = require('react-router');
  var App = require('./app.js');
  var Login = require('./components/Login')
  // var Route = Router.Route;
  // var DefaultRoute = Router.DefaultRoute;
  // var NotFoundRoute = Router.NotFoundRoute;
  // var RouteHandler = Router.RouteHandler;
  // var Link = Router.Link;


  var Main = React.createClass({
    render: function() {
      return (
        <RouteHandler/>
      );
    }
  })

  var routes = (
    <Route handler={Main}>
      <DefaultRoute handler={App}/>
      <Route name="login" path="" handler={App}/>
      <NotFoundRoute handler={App}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('App'));
  });

});
