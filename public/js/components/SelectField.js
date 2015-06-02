/* 
* @Author: Mark Bennett
* @Date:   2015-06-01 12:16:17
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-01 13:45:31
*/

'use strict';

var React = require('react');
var SelectBox = require('react-select');

var logChange = function(value) {
  console.log('Select value changed: ' + value);
}

var SelectField = React.createClass({
  getDefaultProps: function () {
    return {
      searchable: false
    };
  },

  getInitialState: function() {
    return {
      selectValue: 'US'
    };
  },

  updateValue: function(newValue) {
    logChange('Value changed to ' + newValue);
    this.setState({
      selectValue: newValue || null
    });
  },

  focusOptionSelect: function() {
    this.refs.optionSelect.focus();
  },

  render: function() {
    var ops = this.props.OPTIONS;
    return (
      <div>
        <SelectBox ref="optionSelect" options={ops} value={this.state.selectValue} onChange={this.updateValue} searchable={this.props.searchable} />
      </div>
    );
  }
}); 

module.exports = SelectField;
