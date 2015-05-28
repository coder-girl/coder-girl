var React = require('react');
var Welcome = require('../components/Welcome');

var WelcomeViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<WelcomeView pageTitle={pageTitle} />);
    }
  });
};

exports.WelcomeViewWrapper = WelcomeViewWrapper;
