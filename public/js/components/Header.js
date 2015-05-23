/* 
* @Author: nimi
* @Date:   2015-05-22 19:30:58
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 19:56:15
*/

'use strict';

var React = require('react/addons');
var AuthStore = require('../stores/AuthStore')

var Header = React.createClass({
  getInitialState: function(){
    return {
      username: ''
    };
  },

  _onChange : function(){
    console.log('on header change')
    this.setState ({
      username: AuthStore.getUser()
    })
  },

  render : function(){
    return (
      <div>
        <p> Welcome {this.state.username} </p>
      </div>
    );
  }

});
module.exports = Header;
