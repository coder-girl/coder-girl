'use strict';

var React = require('react');

var App = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed / 100),
        seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' ),
        message = 'React has been successfully running for ' + seconds + ' seconds.';

    return <p>{message}</p>;
  }
});

module.exports = App;
