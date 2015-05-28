var React = require('react');
var Welcome = require('../components/Welcome');

var AboutView = React.createClass({
  displayName: 'About View',

  render: function() {
    return (
      <div>
        <h1>Best site ever in the whole wide world!</h1>
      </div>
    );
  }
});

var AboutViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<AboutView pageTitle={pageTitle} />);
    }
  });
};

exports.AboutViewWrapper = AboutViewWrapper;
exports.AboutView = AboutView;