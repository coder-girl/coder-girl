/* 
* @Author: nimi
* @Date:   2015-05-28 14:44:31
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 20:59:50
*/

'use strict';
var Editor = require('./Editor');


var React = require('react/addons');
var ChallengeActions = require('../actions/ChallengeActions');
var Router = require('react-router');
var ChallengeStore = require('../stores/ChallengeStore');

var ChallengeEditor = React.createClass({

  displayName: 'ChallengeEditor',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    ChallengeActions.getChallenge(1)
    return {
      codeContent: '',
      testCode: null
    }
  },

  _onChange: function(){
    var editor = ace.edit("editor");
    var code = ChallengeStore.getChallenge().content;
    editor.getSession().setValue(code);
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
        <Editor value={this.state.value} theme="github" mode="javascript" />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }

})

module.exports = ChallengeEditor;
