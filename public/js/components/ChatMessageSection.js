/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:03:53
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 19:53:38
*/

'use strict';

var React = require('react');
var MessageStore = require('../stores/ChatMessageStore');
// var RoomStore = require('../stores/ChatRoomStore');
var MessageItem = require('./ChatMessageItem');
var MessageSubmit = require('./ChatMessageSubmit');

// fetch the current state data from the stores 
var getStateFromStores = function() {
  return {
    messages: MessageStore.getMessages()
    // rooms: RoomStore.getAll()
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
        <MessageSubmit roomId="this.state.room.id"/>
      </div>
    );
  },

  componentDidUpdate: function() {

  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageSection;
