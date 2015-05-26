var React = require('react');
var Editor = require('../components/Editor');
var AppStore = require('../stores/AppStore');

var CodeLabView = React.createClass({
  displayName: 'CodeLab View',

  getInitialState: function() {
    return AppStore.getInitialState();
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
        <Editor {...this.state}/>
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
