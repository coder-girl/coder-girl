/* 
* @Author: Mark Bennett
* @Date:   2015-05-28 20:56:52
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-29 12:11:28
*/

'use strict';

var React = require('react');
var ChallengeEditor = require('../components/ChallengeEditor');
var _ = require('underscore');

var files = [{
  title: 'Javascript',
  content: 'var example = function(){ \n //enter your code here! \n}'
},
{
  title: 'README.md',
  content: 'Just basic readme'
}];

var getTitleList = function() {
  return _.chain(files)
    .map(function(file) {
      return _.pick(file, 'title');
    })
    .value();
}();

var Challenge = React.createClass({
  getInitialState: function() {
    return {
      activeTitle: _.first(files).title
    };
  },

  showContent: function(title) {
    this.setState({
      activeTitle: title
    });
  },

  getContent: function() {
    var that = this;
    return _.chain(files)
      .filter(function(file) {
        return (file.title === that.state.activeTitle);
      })
      .first()
      .value()
      .content;
  },

  submitCode: function(){
    var editor = ace.edit("editor");
    var userCode = editor.getSession().getValue();
    var testWorker = new Worker('./js/testWorker.js');
    testWorker.postMessage(['c01', userCode]);
    testWorker.addEventListener('message', function(e) {
      if(e.data){
        console.log('the test passed!')
      } else {
        console.log('the test failed!')
      }
      //TODO: show the error in a different component
    }, false);
  },

  render: function() {
    return (
      <div>
        <h1>Challenge</h1>
        <ChallengeEditor content={this.getContent()} theme="github" mode="javascript" />
        <button onClick={this.submitCode}>Submit</button>
      </div>
    );
  }
});

module.exports = Challenge;
