/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-30 16:37:49
*/

'use strict';
var Editor = require('./Editor');

var React = require('react/addons');
var ChallengeActions = require('../actions/ChallengeActions');
var Router = require('react-router');
var ChallengeStore = require('../stores/ChallengeStore');
var AuthStore = require('../stores/AuthStore');
var Chat = require('../components/Chat');

var ChallengeEditor = React.createClass({

  displayName: 'ChallengeEditor',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    var testCode = AuthStore.getUser().challengeNumber;
    ChallengeActions.getChallenge(testCode);
    return {
      codeContent: '',
      testCode: testCode
    };
  },

  _onChange: function() {
    var change = ChallengeStore.getChangeType();
    var editor = ace.edit('editor');
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

  handleSubmit: function() {
    var editor = ace.edit('editor');
    var userCode = editor.getSession().getValue();
    var testCode = this.state.testCode;
    ChallengeActions.submitCode(userCode, testCode);
  },

  render: function() {
    return (
      <div className="challengeEditor">
        <Editor theme="github" mode="javascript" />
        <div className="bottom-bar">
          <div className="action-bar-inner">
        <button className="button-horizontal ui-button" onClick={this.handleSubmit}>Submit</button>
      </div>
      </div>
      </div>
    );
  }

});

module.exports = ChallengeEditor;
