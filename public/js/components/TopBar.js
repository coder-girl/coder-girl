var React = require('react');

var Topbar = React.createClass({
  render: function() {
    return (
      <div>
        <h5>Challenges</h5>
        <section className="aside">
          {this.props.title}
          <section className="article">
            {this.props.description}
          </section>
        </section>
      </div>
    );
  }
});

module.exports = Topbar;
