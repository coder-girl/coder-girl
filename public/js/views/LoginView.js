var React = require('react');
var Login = require('../components/Login');

var LoginView = React.createClass({
  displayName: 'Login View',

  render: function() {
    return (
      <div>
        <div id="videos">
          <div className="video"><video controls loop autoPlay src="/gwc.mp4"></video></div>
        </div>
        <div className="login-center">
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
