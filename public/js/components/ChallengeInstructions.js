/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-29 10:21:10
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
      results: []
    };
  },

  _onChange: function() {
    console.log('the instructions change');
    this.setState({
      instructions: ChallengeStore.getChallenge().instructions,
      results: ChallengeStore.getChallenge().results
    });
  },

  componentDidMount: function() {
    ChallengeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ChallengeStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <h4 className="marginPullTop5">Your Challenge!</h4>
        <p> {this.state.instructions} </p>
        { this.state.results.map(function(testResult){ return
        <p> {testResult} </p>
        }) }
      </div>
    );
  }

});

module.exports = ChallengeInstructions;
