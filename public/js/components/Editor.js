var React = require('react');
var ace = require('brace');
var Router = require('react-router');
var Link = Router.Link;

require('brace/theme/github');
require('brace/mode/javascript');

var Editor = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    mode: React.PropTypes.string,
    theme: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      name: 'editor',
      mode: 'javascript',
      theme: 'monokai'
    };
  },
  componentDidMount: function() {
    var editor = ace.edit(this.props.name);
    editor.getSession().setMode('ace/mode/' + this.props.mode);
    editor.setTheme('ace/theme/' + this.props.theme);
    editor.session.setOption("wrap", true);
  },
  render: function() {
    return (<div>
              <div id={this.props.name}>
                {this.props.value}
              </div>
            </div>);
  }
});

module.exports = Editor;
