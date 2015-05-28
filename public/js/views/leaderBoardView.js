var React = require('react');
var LeaderBoardView = require('../components/Leaderboard');


var LeaderBoardViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<LeaderBoardView pageTitle={pageTitle} />);
    }
  });
};

exports.LeaderBoardViewWrapper = LeaderBoardViewWrapper;
// exports.LeaderBoardView = LeaderBoardView;
