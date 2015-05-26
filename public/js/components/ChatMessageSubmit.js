/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:16:18
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-25 20:20:39
*/

'use strict';

var React = require('react');
var MessageActions = require('../actions/ChatMessageActions');

var ENTER_KEY_CODE = 13;

var MessageSubmit = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },

  render: function() {
    return (
      <textarea className="message-submit-textarea" name="message" value={this.state.text} 
        onChange={this._onChange} onKewDown={this._onKeyDown} />
    )
  },

  _onChange: function(event, value) {
    this.setState({
      text: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        MessageActions.createMessage(text, this.props.roomId)
      }
    }
  }

});