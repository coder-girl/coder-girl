var React = require('react');
var Editor = require('../components/Editor');
var _ = require('underscore');
var Topbar = require('../components/Topbar');

var files = [
  {
    title: 'Javascript',
    content: 'function callMe() { \n console.log(\'Hi, Dave!\') \n}',
    description: 'You want to send out a message via console.log'
  }
];

var getTitle = function() {
  return files[0].title;
}();

var getDescription = function() {
  return files[0].description;
}();

var EditorView = React.createClass({
  getInitialState: function() {
    return {
      activeTitle: _.first(files).title
    };
  },
  getContent: function() {
    var that = this;
    return _.chain(files)
      .filter(function(file) {
        return (file.title === that.state.activeTitle);
      })
      .first()
      .value()
      .content;
  },
  render: function() {
    return (
      <div>
        <Topbar title={getTitle} description={getDescription}/>
        <Editor name="editor" content={this.getContent()} theme="github" mode="javascript" />
      </div>
    );
  }
});



var CodeLabView = React.createClass({
  displayName: 'CodeLab View',

  getInitialState: function() {
    return {};
  },

  render: function() {
    // if (typeof(this.state == undefined)) {
    //  return <div> Loading </div>
    // }

    return (
      <div>
        <h2>
          {this.props.pageTitle}
        </h2>
        <div>
          <EditorView />
        </div>
      </div>
    );
  }
});

var CodeLabViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<CodeLabView pageTitle={pageTitle} />);
    }
  });
};

exports.CodeLabViewWrapper = CodeLabViewWrapper;
exports.CodeLabView = CodeLabView;
