/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:04:29
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 12:20:33
*/

'use strict';

var React = require('react');
var moment = require('moment');

var MessageItem = React.createClass({
  render: function() {
    var message = this.props.message;
    var date = new Date(message.createdAt);
    return (
      <li className="message-item">
        <h6 className="message-author">{message.authorName}</h6>
        <div className="message-date-and-text">
          <span className="message-date">{date.toLocaleTimeString()}: </span>
          <span className="message-text">{message.text}</span>
        </div> 
      </li>
    );
  }
});

module.exports = MessageItem; 