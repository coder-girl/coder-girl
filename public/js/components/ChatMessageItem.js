/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:04:29
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-26 19:56:56
*/

'use strict';

var React = require('react');

var MessageItem = React.createClass({
  render: function() {
    var message = this.props.message;
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