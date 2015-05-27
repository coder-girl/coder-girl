/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:02:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 12:56:09
*/

'use strict';

var React = require('react');
var MessageSection = require('./ChatMessageSection');
// var RoomSection = require('./ChatRoomSection');

var Chat = React.createClass({
  
  render: function() {
    return (
      <div className='chat-section'>
        <MessageSection />
      </div>
    );
  }
});

module.exports = Chat;