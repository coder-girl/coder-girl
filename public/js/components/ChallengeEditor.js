/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 15:55:52
*/

'use strict';
var Editor = require('./Editor');

var React = require('react/addons');
var ChallengeActions = require('../actions/ChallengeActions');
var Router = require('react-router');
var ChallengeStore = require('../stores/ChallengeStore');
var AuthStore = require('../stores/AuthStore');

var ChallengeEditor = React.createClass({

  displayName: 'ChallengeEditor',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    var testCode = AuthStore.getUser().level
    ChallengeActions.getChallenge(testCode)
    return {
      codeContent: '',
      testCode: testCode
    }
  },

  _onChange: function(){
    var change = ChallengeStore.getChangeType();
    var editor = ace.edit("editor");
    var code = ChallengeStore.getChallenge().content;
    editor.getSession().setValue(code);
    this.setState.testCode = AuthStore.getUser().level;
    if (change === 'passed') {
      this.transitionTo('/congrats');
    }
  },

  componentDidMount: function() {
    ChallengeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ChallengeStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(){
    var editor = ace.edit("editor");
    var userCode = editor.getSession().getValue();
    var testCode = this.state.testCode;
    ChallengeActions.submitCode(userCode, testCode)
  }, 

   render: function() {
    return (
      <div>
        <Editor theme="github" mode="javascript" />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }

})

module.exports = ChallengeEditor;
