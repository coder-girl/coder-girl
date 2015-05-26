/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:04:29
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-25 20:52:24
*/

'use strict';

var React = require('react');

var MessageItem = React.createClass({
  render: function() {
    // var message = this.props.message;
    var message = {
      id: 'm_1',
      threadID: 't_1',
      threadName: 'Jing and Bill',
      authorName: 'Bill',
      text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
      date: Date.now() - 99999
    };
    return (
      <li className="message-item">
        <h5 className="message-author">{message.authorName}</h5>
        <div className="message-date">{message.date}</div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }
});

module.exports = MessageItem; 