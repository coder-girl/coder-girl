var React = require('react');
var LeaderBoardView = require('../components/Leaderboard');

// var LeaderBoardView = React.createClass({
//   displayName: 'Leader Board View',

//   render: function() {
//     return (
//       <div>
//         <h2>
//           {this.props.pageTitle}
//         </h2>
//         <div>
//           this is a test
//         </div>
//       </div>
//     );
//   }
// });

var LeaderBoardViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<LeaderBoardView pageTitle={pageTitle} />);
    }
  });
};

exports.LeaderBoardViewWrapper = LeaderBoardViewWrapper;
// exports.LeaderBoardView = LeaderBoardView;
