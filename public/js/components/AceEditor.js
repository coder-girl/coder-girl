var React = require('react');

var AceEditor = React.createClass({
  onChange: function() {
    var value = this.editor.getValue();

    if (this.props.onChange) {
      this.props.onChange(this.props.name, value);
    }

  },
  componentDidMount: function() {
    var self = this;
    this.editor = ace.edit(this.props.name);

    this.editor.getSession().setUseWorker(false);
    this.editor.getSession().setMode('ace/mode/' + this.props.mode);

    if (this.props.onLoad) {
      this.props.onLoad(this.editor);
    }
  },
  componentWillReceiveProps: function(nextProp) {
    this.editor = ace.edit(nextProps.name);
    this.editor.getSession().setMode('ace/mode/' + nextProps.mode);

    if (this.editor.getValue() !== nextProps.value) {
      this.editor.setValue(nextProps.value);
    }

    if (nextProps.onLoad) {
      nextProps.onLoad(this.editor);
    }
  },

  render: function() {
    return (
      <div id={this.props.name} onChange={this.onChange}></div>
    );
  }
});

module.exports = AceEditor;

