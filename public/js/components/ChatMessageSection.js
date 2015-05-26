/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:03:53
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-25 20:22:28
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
    messages: MessageStore.getAll()
    // rooms: RoomStore.getAll()
  }
};

// create a MessageItem component for a given message 
var createMessageItemForMessage = function(message) {
  return (
    <MessageItem message={message} id={message.id} /> 
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
    var messageItems = this.state.messages.map(createMessageItemForMessage);
    return (
      <div className='message-section'>
        // <h3 className="message-room-heading">{this.state.room.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageItems}
        </ul>
        <MessageInput roomId="this.state.room.id"/>
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
