/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-13 12:35:38
*/

'use strict';
var React = require('react/addons');
var ChallengeActions = require('../actions/ChallengeActions');
var Router = require('react-router');
var ChallengeStore = require('../stores/ChallengeStore');
var Markdown = require('react-markdown');

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
      hintsShown: 0,
      challengeTitle: "",
    };
  },

  _onChange: function() {
    var challenge = ChallengeStore.getChallenge();
    this.setState({
      instructions: challenge.instructions,
      results: challenge.results,
      challengeNumber: challenge.testCode,
      challengeTitle: challenge.title,
      hint1: challenge.hint1,
      hint2: challenge.hint2
    });

    if(this.state.results.length > 0){
      this._scrollToBottom();
    }
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
      return <div className="challenge-hint" key={i}> <b>Hint:</b> <Markdown source={hint} /></div>
    });
  },

  componentDidMount: function() {
    ChallengeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ChallengeStore.removeChangeListener(this._onChange);
  },


  _scrollToBottom: function() {
    var node = React.findDOMNode(this.refs.instructionPanel);
    node.scrollTop = node.scrollHeight;
  },


  render: function() {
    var testResults = this.state.results.map(function(testResult){
      return <p ref="testResults" className="testResults"> {testResult} </p>
    });
    var button = this.state.hintsShown < 2 ? 
      <button className="button hint-button" ref="hint" onClick={this.incrementHintsShown}>Show hint</button> : 
      null; 

    var hints = this.getHints();


    return (
      <div className="instructionPanel" ref="instructionPanel">
        <h4 className="marginPullTop5">{this.state.challengeTitle}</h4>
        <p><Markdown source={this.state.instructions} /></p>
        <div className="hints-wrapper">
          {hints}
        </div>
        {button}
        <p>{testResults}</p>    
      </div>
    );
  }

});

module.exports = ChallengeInstructions;
