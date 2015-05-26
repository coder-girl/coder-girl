var React = require('react');
var Login = require('../components/Login');

var LoginView = React.createClass({
  displayName: 'Login View',

  render: function() {
    return (
      <div>
        <h2>
          {this.props.pageTitle}
        </h2>
        <div>
          <Login />
        </div>
      </div>
    );
  }
});

var LoginViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<LoginView pageTitle={pageTitle} />);
    }
  });
};

exports.LoginViewWrapper = LoginViewWrapper;
exports.LoginView = LoginView;
