'use strict';

var React = require('react');
var App = require('./components/app');

var AppFactory = React.createFactory(App),
    start = new Date().getTime();

setInterval(function() {
  React.render(
    AppFactory({elapsed: new Date().getTime() - start}),
    document.getElementById('container')
  );
}, 50);
