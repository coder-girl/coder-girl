/* 
* @Author: Mark Bennett
* @Date:   2015-05-27 19:54:19
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 20:04:46
*/

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');

var Welcome = React.createClass({
  render: function() {
    var user = AuthStore.getUser();
    return (

    )
  }
});