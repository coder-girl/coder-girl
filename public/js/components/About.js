var React = require('react');

var About = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Best site ever in the whole wide world!</h1>
        <audio className="hidden" src="/asset/SkaterboyMeetsTechGirl_prod_kybate.mp3" controls autoPlay loop></audio> 
      </div>
    );
  }
});

module.exports = About;
