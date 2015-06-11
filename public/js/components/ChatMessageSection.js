/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:03:53
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-11 15:09:08
*/

'use strict';

var React = require('react');
var MessageStore = require('../stores/ChatMessageStore');
var MessageItem = require('./ChatMessageItem');
var MessageSubmit = require('./ChatMessageSubmit');
var MessageActions = require('../actions/ChatMessageActions');

// fetch the current state data from the stores 
var getStateFromStores = function() {
  return {
    messages: MessageStore.getMessages()
  }
};

// create a MessageItem component for a given message 
var createMessageItemForMessage = function(message) {
  return (
    <MessageItem message={message} key={message.id} /> 
  );
};

var MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);

    // populate the chat with previous messages from the database 
    MessageActions.getMessages();
    this._scrollToBottom();
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messageItems = [];
    for (var key in this.state.messages) {
      var message = this.state.messages[key];
      messageItems.push(createMessageItemForMessage(message));
    };
    return (
      <div className='message-section'>
        <ul className="message-list" ref="messageList">
          {messageItems}
        </ul>
      </div>
    );
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageSection;
