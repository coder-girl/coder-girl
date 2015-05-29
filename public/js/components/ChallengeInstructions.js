/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 17:00:27
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
    var challenge = ChallengeActions.getChallenge()
    return {
      instructions: challenge.instructions
    }
  },

    _onChange: function(){
      console.log('the instructions change')
    this.setState({
      instructions: ChallengeStore.getChallenge().instructions
    })
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
        <p> {this.state.instructions} </p>
      </div>
    );
  }

})

module.exports = ChallengeInstructions;
