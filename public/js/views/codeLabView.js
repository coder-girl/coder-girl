var React = require('react');

var CodeLabView = React.createClass({
  displayName: 'CodeLab View',

  render: function() {
    return (
      <div>
        <h2>
          {this.props.pageTitle}
        </h2>
      </div>
    );
  }
});

var CodeLabViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<CodeLabView pageTitle={pageTitle} />);
    }
  });
};

exports.CodeLabViewWrapper = CodeLabViewWrapper;
exports.CodeLabView = CodeLabView;
