var React = require('react');
var ace = require('brace');


require('brace/theme/github');
require('brace/mode/javascript');

var Editor = React.createClass({
    propTypes: {
        mode  : React.PropTypes.string,
        theme : React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            name   : 'editor',
            mode   : 'javascript',
            theme  : 'monokai'
        };
    },
    componentDidMount: function() {
        var editor = ace.edit(this.props.name);
        editor.getSession().setMode('ace/mode/'+this.props.mode);
        editor.setTheme('ace/theme/'+this.props.theme);
    },
    render: function() {
        return (<section id={this.props.name}>{this.props.content}</section>);
    }
});

module.exports = Editor;
