/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:03:53
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 15:14:48
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
    // return getStateFromStores();
    return {
      messages: [{
        id: 'm_1',
        threadID: 't_1',
        threadName: 'Jing and Bill',
        authorName: 'Bill',
        text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
        date: Date.now() - 99999
      }],
      room: {
        name: "Mark's Chat",
        id: 3
      }
    }
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
