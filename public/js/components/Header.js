/* 
* @Author: nimi
* @Date:   2015-05-22 19:30:58
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-25 10:33:51
*/

'use strict';

var React = require('react/addons');
var AuthStore = require('../stores/AuthStore');

var Header = React.createClass({


  //Parses querystring in URL
  getParameterByName: function(name){
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },


  getInitialState: function(){
    return {
      username: ''
    };
  },

  _onChange : function(){
    this.setState ({
      username: AuthStore.getUser()
    })
  },


  componentDidMount: function() {
    var username = this.getParameterByName("name");
    this.setState({
      username: username
    })
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render : function(){
    return (
      <div>
        <p> Welcome {this.state.username}</p>
      </div>
    );
  }

});

var React = require('react/addons');
var CheckboxWithLabel = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
  },
  render: function() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
});
// module.exports = CheckboxWithLabel;
module.exports = Header;
