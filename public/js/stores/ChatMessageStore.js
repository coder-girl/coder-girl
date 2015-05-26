/* 
* @Author: Mark Bennett
* @Date:   2015-05-25 19:33:52
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-25 20:35:32
*/

'use strict';

var messages = {};

var MessageStore = {
  getAll: function() {
    return messages;
  }
};

module.exports = MessageStore;