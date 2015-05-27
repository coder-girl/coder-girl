/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:04:29
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 12:21:46
*/

'use strict';

var React = require('react');
var moment = require('moment');

var MessageItem = React.createClass({
  render: function() {
    var message = this.props.message;
    var date = new Date(message.createdAt);
    console.log(date);
    return (
      <li className="message-item">
        <h5 className="message-author">{message.authorName}</h5>
        <div className="message-date-and-text">
          <span className="message-date">{date.toLocaleTimeString()}: </span>
          <span className="message-text">{message.text}</span>
        </div> 
      </li>
    );
  }
});

module.exports = MessageItem; 