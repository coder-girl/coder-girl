/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:04:29
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-06 16:16:35
*/

'use strict';

var React = require('react');
var ReactEmojiMixin = require('react-emoji');
var moment = require('moment');

var lastAuthor = null;

var MessageItem = React.createClass({
  mixins: [
    ReactEmojiMixin
  ],

  render: function() {
    var message = this.props.message;
    var date = new Date(message.createdAt);
    var prettyDate = moment(date).fromNow();
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
          <div className="message-text-wrapper">
            <span className="message-text">{ this.emojify(message.text, {emojiType: 'emojione'}) }</span>
          </div> 
          <div className="message-date-wrapper">
            <span className="message-date">{ prettyDate }</span>
          </div> 
      </li>
    );
  }
});

module.exports = MessageItem; 