/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:02:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-06 16:31:10
*/

'use strict';

var React = require('react');
var MessageSection = require('./ChatMessageSection');
var MessageSubmit = require('./ChatMessageSubmit');

var Chat = React.createClass({

  toggleChat: function() {
    var $node = $(React.findDOMNode(this.refs.minimize));
    if ($node.html() === '-') {
      $node.html('+');
    } else {
      $node.html('-');
    }
    $(React.findDOMNode(this.refs.chat)).slideToggle();
  },

  render: function() {
    return (
      <div className='chat-section'>
        <div className="chat-menu-bar">
          <a className="close-button" ref="minimize" onClick={this.toggleChat}>-</a>
        </div>
        <div className="chat-window" ref="chat">
          <MessageSection />
          <MessageSubmit />
        </div>
      </div>
    );
  }
});

module.exports = Chat;
