/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-05 10:34:11
*/

'use strict';
var React = require('react/addons');
var ChallengeActions = require('../actions/ChallengeActions');
var Router = require('react-router');
var ChallengeStore = require('../stores/ChallengeStore');

var ChallengeInstructions = React.createClass({

  displayName: 'ChallengeInstructions',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      instructions: '',
      results: [],
      challengeNumber: null,
      hint1: "",
      hint2: "",
      hintsShown: 0
    };
  },

  _onChange: function() {
    var challenge = ChallengeStore.getChallenge();
    this.setState({
      instructions: challenge.instructions,
      results: challenge.results,
      challengeNumber: challenge.testCode,
      hint1: challenge.hint1,
      hint2: challenge.hint2
    });
    console.log('results', this.state.results)
  },

  showHint: function() {
    var hint;
    if (!this.state.hintsShown) {
      hint = this.state.hint1;
    } else {
      hint = this.state.hint2;
    }
    this.state.hintsShown++;
    if (this.state.hintsShown >= 2) {

    }
  },

  componentDidMount: function() {
    ChallengeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ChallengeStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var testResults = this.state.results.map(function(testResult){
      return <p> {testResult} </p>
    })

    return (
      <div>
        <h4 className="marginPullTop5">Challenge {this.state.challengeNumber}: </h4>
        <p> {this.state.instructions} </p>
        {testResults}
        <button className="button hint-button" onClick={showHint}>Show hint</button>
      </div>
    );
  }

});

module.exports = ChallengeInstructions;
