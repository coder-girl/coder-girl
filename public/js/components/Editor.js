var React = require('react');

var AceEditor = require('./AceEditor');

var Editor = React.createClass({
  getInitialState: function() {
    return {
      settings: this.props.settings,
      editor: this.props.editor
    };
  },
  onChange: function(name, value) {
    var this_value = value;
    var state = {};
    var parent = {};
    var parent_name = 'editor';

    parent[parent_name] = this.state[parent_name];
    state[name] = this_value;
    parent[parent_name][name] = state[name];
  },
  render: function() {
    return (
      <div className="main">
        <ul className="tabs">
          <li>
            <input type="radio" name="tabs" id="tab1" defaultChecked />
            <label htmlFor="tab1">HTML</label>
            <div id="tab-content1" className="tab-content tab-editor">
              <AceEditor name="hmtl" mode="html" onChange={this.onChange} value={this.state.editor.html} />
            </div>
          </li>
        <li>
          <input type="radio" name="tabs" id="tab2" />
          <label htmlFor="tab2">Style</label>
          <div id="tab-content1" className="tab-content tab-editor">
            <AceEditor name="style" mode="scss" onChange={this.onChange} value={this.state.editor.style} />
          </div>
        </li>
        <li>
          <input type="radio" name="tabs" id="tab3" defaultChecked />
          <label htmlFor="tab3">JavaScript</label>
          <div id="tab-content3" className="tab-content tab-editor">
            <AceEditor name="script" mode="javascript" onChange={this.onChange} value={this.state.editor.script} />
          </div>
        </li>
      </ul>
      </div>
    );
  }
});

module.exports = Editor;
