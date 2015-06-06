var React = require('react');

var About = React.createClass({
  render: function() {
    return (
      <div id="about-container">

        <div className="bar0">
          <img src="./../../asset/girls-coding.jpg" alt="Girls coding together"/>
        </div>

        <div className="bar1 title">
          <div className="title-block title-block-left">
            <h1>Made for girls, by girls (mostly)</h1>
            <h4>Learn to program alongside other like-minded girls in a collaborative environment.</h4>
          </div>
        </div>

        <div className="bar2 features">
          <div className="content-container">
            <div className="feature-block">
              <h3 className="feature">Learn core skills</h3>
              <h6 className="description">Build a reliable foundation of programming techniques.<br/></h6>
            </div>

            <div className="feature-block">
              <h3 className="feature">Tackle challenges</h3>
              <h6 className="description">Earn points and level-up as you work through engaging problems.</h6>
            </div>

            <div className="feature-block">
              <h3 className="feature">Collaborate with friends</h3>
              <h6 className="description">Offer or receive help while participating in a highly social environment.</h6>
            </div>
          </div>
        </div>

        <div className="bar3 mission ">
          <div className="title-block title-block-right">
            <h1>Our Mission</h1>
            <h4>Today's stats are bleak. We strive to get girls interested in Computer Science and programming at a young age in order to address the current disparity.</h4>
          </div>

          <div className="all-stats content-container">

            <div className="stat-block">
              <p className="stat-description-only">Only</p>
              <h2 className="stat-number">19%</h2>
              <p className="stat-description">of high school AP Computer Science test-takers in 2012 were female.</p>
            </div>

            <div className="stat-block">
              <p className="stat-description-only">Only</p>
              <h2 className="stat-number">12%</h2>
              <p className="stat-description">of Computer Science degree recipients in 2012 were women.</p>
            </div>

          </div>
        </div>

        <div className="bar4 team">

          <div className="title-block title-block-left">
            <h1>Our Team</h1>
            <h4>Check out the engineers behind Coder Girl.</h4>
          </div>

          <div className="all-members content-container">

            <div className="team-member-block">
              <img id="lauren-pic" src="./../../asset/lauren.jpeg" />
              <h5 className="member-name">Lauren<br/>Spiegel</h5>
              <p className="member-description">A nifty good time.</p>
              <a className="github" href="#"></a>
              <a className="linkedin" href="#"></a>
            </div>

            <div className="team-member-block">
              <img id="dave-pic" src="./../../asset/dave.jpeg" />
              <h5 className="member-name">Dave<br/>Trinh</h5>
              <p className="member-description">Bundle of energy.</p>
              <a className="github" href="#"></a>
              <a className="linkedin" href="#"></a>
            </div>    

            <div className="team-member-block">
              <img id="nimi-pic" src="./../../asset/nimi.jpeg" />
              <h5 className="member-name">Nimi<br/>Dharithreesan</h5>
              <p className="member-description">All-around badass.</p>
              <a className="github" href="#"></a>
              <a className="linkedin" href="#"></a>
            </div>

            <div className="team-member-block">
              <img id="mark-pic" src="./../../asset/mark.jpg" />
              <h5 className="member-name">Mark<br/>Bennett</h5>
              <p className="member-description">Extremely huggable.</p>
              <a className="github" href="#"></a>
              <a className="linkedin" href="#"></a>
            </div>

          </div>
        </div>

        <div className="bar5 stack">
          <div className="title-block title-block-right">
            <h1>Our Stack</h1>
            <h4>Check out the tools used to build Coder Girl.</h4>
          </div>

          <div className="stack-block content-container">
            <div className="stack-group stack-frontend">
              <a href="#" className="react" alt="React.js"><img className="stack" src="#"/></a>
              <a href="#" className="flux" alt="Flux"><img className="stack" src="#"/></a>
              <a href="#" className="foundation" alt="Foundation"><img className="stack" src="#"/></a>
            </div>
            <div className="stack-group stack-backend">
              <a href="#" className="node" alt="Node.js"><img className="stack" src=""/></a>
              <a href="#" className="express" alt="Express"><img className="stack" src=""/></a>
              <a href="#" className="socketio" alt="Socket.io"><img className="stack" src=""/></a>
              <a href="#" className="postgresql" alt="PostgreSQL"><img className="stack" src=""/></a>
            </div>
            <div className="stack-group stack-devops">
              <a href="#" className="gulp" alt="Gulp"><img className="stack" src=""/></a>
              <a href="#" className="jasmine" alt="Jasmine"><img className="stack" src=""/></a>
              <a href="#" className="travisci" alt="TravisCI"><img className="stack" src=""/></a>
              <a href="#" className="instagram" alt="Instagram API"><img className="stack" src=""/></a>
            </div>
          </div>  
        </div>

        <div className="bar6 footer">
          <div className="content-container">
            <h5><a href="http://www.coder-girl.io" className="get-started">Start learning with Coder Girl</a></h5>
            <p className="copyright">&copy;Coder Girl, 2015</p>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = About;
