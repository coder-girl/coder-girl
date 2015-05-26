var React = require('react');

var LeaderBoardView = React.createClass({
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

var LeaderBoardViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<LeaderBoardView pageTitle={pageTitle} />);
    }
  });
};

exports.LeaderBoardViewWrapper = LeaderBoardViewWrapper;
exports.LeaderBoardView = LeaderBoardView;
