/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:02:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-03 11:23:58
*/

'use strict';

var React = require('react');
var MessageSection = require('./ChatMessageSection');
var MessageSubmit = require('./ChatMessageSubmit');

// var RoomSection = require('./ChatRoomSection');

var Chat = React.createClass({
  
  render: function() {
    return (
      <div className='chat-section'>
        <MessageSection />
        <MessageSubmit />
      </div>
    );
  }
});

module.exports = Chat;