/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:04:29
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-30 18:19:17
*/

'use strict';

var React = require('react');
var moment = require('moment');

var lastAuthor = null;

var MessageItem = React.createClass({
  render: function() {
    var message = this.props.message;
    var date = new Date(message.createdAt);
    var author; 
    if (message.authorName === lastAuthor) {
      author = "";
    } else {
      author = <h6 className="message-author">{message.authorName}</h6>;
    } 
    lastAuthor = message.authorName;
    return (
      <li className="message-item">
        {author}
        <div className="message-date-and-text">
          <span className="message-text">{message.text}</span>
          <span className="message-date">{date.toLocaleTimeString()} </span>
        </div> 
      </li>
    );
  }
});

module.exports = MessageItem; 