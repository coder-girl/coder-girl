var React = require('react');
var Editor = require('../components/Editor');
var ChallengeEditor = require('../components/ChallengeEditor')
var ChallengeInstructions = require('../components/ChallengeInstructions')

var CodeLabView = React.createClass({
  displayName: 'CodeLab View',

  getInitialState: function() {
    return {};
  },

  render: function() {
    // if (typeof(this.state == undefined)) {
    //  return <div> Loading </div>
    // }

    return (
      <div>
        <h2>
          {this.props.pageTitle}
        </h2>
        <div>
          <ChallengeInstructions />
          <ChallengeEditor />
        </div>
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
