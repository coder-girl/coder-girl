/* 
* @Author: Mark Bennett
* @Date:   2015-05-23 15:59:46
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-23 16:37:42
*/

'use strict';

var React = require('react');

module.exports = function(Component, props, stubs) {
  function RouterStub() {};

  Object.assign(RouterStub, {
    makePath: function() {},
    makeHref: function() {},
    transitionTo: function() {},
    replaceWith: function() {},
    goBack: function() {},
    getCurrentPath: function() {},
    getCurrentRoutes: function() {},
    getCurrentPathname: function() {},
    getCurrentParams: function() {},
    getCurrentQuery: function() {},
    isActive: function() {},
    getRouteAtDepth: function() {},
    setRouteComponentAtDepth: function() {}
  }, stubs);

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number
    },

    getChildContext: function() {
      return {
        router: RouterStub,
        routeDepth: 0
      };
    },

    render: function() {
      return (
        <Component {...props} />
      )
    }
  });
};