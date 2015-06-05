/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-05 16:50:52
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
  },

  incrementHintsShown: function() {
    this.setState({
      hintsShown: ++this.state.hintsShown
    });
  },

  getHints: function() {
    var hint = "hint";
    var hints = [];
    var hintsShown = this.state.hintsShown;
    var i = 1;
    while (i <= hintsShown) {
      hint += i;
      hints.push(this.state[hint]);
      hint = hint.slice(0, 4);
      i++;
    }

    return hints.map(function(hint, i) {
      return <p className="challenge-hint" key={i}> Hint: {hint} </p>
    });
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
    });
    var button = this.state.hintsShown < 2 ? 
      <button className="button hint-button" ref="hint" onClick={this.incrementHintsShown}>Show hint</button> : 
      null; 

    var hints = this.getHints();

    return (
      <div>
        <h4 className="marginPullTop5">Challenge {this.state.challengeNumber}: </h4>
        <p> {this.state.instructions} </p>
        <div className="hints-wrapper">
          {hints}
        </div>
        {button}
        {testResults}       
      </div>
    );
  }

});

module.exports = ChallengeInstructions;
