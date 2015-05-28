var React = require('react');
var Signup = require('../components/Signup');

var SignupView = React.createClass({
  displayName: 'Signup View',

  render: function() {
    return (
      <div>
        <div id="videos">
          <div className="video"><video controls loop autoPlay src="/gwc.mp4"></video></div>
        </div>
        <div className="login-center">
          <Signup />
        </div>
      </div>
    );
  }
});

var SignupViewWrapper = function(pageTitle) {
  return React.createClass({
    render: function() {
      return (<SignupView pageTitle={pageTitle} />);
    }
  });
};

exports.SignupViewWrapper = SignupViewWrapper;
exports.SignupView = SignupView;