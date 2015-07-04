var React = require('react');
var Chart = require('chart.js');



var About = React.createClass({

  componentDidMount: function() {
    var data = [{
      value: 19,
      color: '#631E8C'
    },
      {
        value: 81,
        color: '#232323',
      },
    ];

    var data1 = [{
      value: 12,
      color: '#631E8C'
    },
      {
        value: 88,
        color: '#232323'
      },
    ];
    var ctx1 = document.getElementById('chart1').getContext('2d');
    var ctx2 = document.getElementById('chart2').getContext('2d');
    var myPieChart = new Chart(ctx1).Pie(data);
    var myPieChart2 = new Chart(ctx2).Pie(data1);

    myPieChart.width = '900px';

    console.log(myPieChart);
  },


  render: function() {
    return (
      <div id="about-container">
      <audio className="song" src="/asset/SkaterboyMeetsTechGirl_prod_kybate.mp3" controls loop></audio> 
        <div className="bar1 title">
          <div className="girls-coding content-container">
            <img className="girls-coding-image" src="./../../asset/girls-coding.jpg" alt="Girls coding together" />
          </div>
          <div className="title-block title-block-left">
            <h1>Learn to code now</h1>
            <h4>Dive into challenges and chat with other Coder Girls. Earn points to get your Instagram feed featured on our Leaderboard.</h4>
          </div>
        </div>
        <div className="bar2 features">
          <div className="content-container">
            <div className="feature-icon">
              <i className="fa fa-code fa-3x"></i>
            </div>
            <div className="feature-block">
              <h3 className="feature">Learn core skills</h3>
              <h6 className="description">No prior experience needed.</h6>
              <h6 className="description">We start with the basics.</h6>
            </div>
            <div className="feature-icon">
              <i className="fa fa-star-o fa-3x"></i>
            </div>
            <div className="feature-block">
              <h3 className="feature">Tackle challenges</h3>
              <h6 className="description">Earn points and level-up.</h6>
              <h6 className="description">Show off your Instagram pics.</h6>
            </div>
            <div className="feature-icon">
              <i className="fa fa-comments-o fa-3x"></i>
            </div>
            <div className="feature-block">
              <h3 className="feature">Collaborate with friends</h3>
              <h6 className="description">Have a question or comment?</h6>
              <h6 className="description">Start chatting.</h6>
            </div>
          </div>
        </div>
        <div className="bar3 mission ">

          <div className ="title-block title-block-right">
            <h1>Our Mission</h1>
            <h4>More men than women are learning to code. Let's reverse the trend.</h4>
          </div>
          <div className="all-stats content-container">
            <div className="stat-block">
          <div className="canvas-holder half">
            <canvas id="chart1" width="250" height="125"></canvas>
          </div>
          <p className="stat-description-only"><span className="stat-number">19%</span></p>
              <p className="stat-description">female AP Computer Science test-takers in 2012</p>
            </div>
            <div className="stat-block">
          <div className="canvas-holder half">
            <canvas id="chart2" width="250" height="125"></canvas>
          </div>
          <p className="stat-description-only"><span className="stat-number">12%</span></p>
              <p className="stat-description">female Computer Science degree recipients in 2013</p>
            </div>
          </div>
        </div>
        <div className="bar4 team">
          <div className="title-block title-block-left">
            <h1>Our Team</h1>
            <h4>Putting the code in Coder Girl.</h4>
          </div>
          <div className="all-members content-container">
            <div className="team-member-block">
              <img id="lauren-pic" src="./../../asset/lauren.jpg" />
              <h5 className="member-name">Lauren
                <br/>Spiegel</h5>
              <p className="member-description">A nifty good time.</p>
              <a className="github" href="https://github.com/CodeRevelRepeat"><i className="fa fa-github fa-lg"></i></a>
              <a className="linkedin" href="https://www.linkedin.com/in/spiegel"><i className="fa fa-linkedin fa-lg"></i></a>
            </div>
            <div className="team-member-block">
              <img id="dave-pic" src="./../../asset/dave.jpeg" />
              <h5 className="member-name">Dave
                <br/>Trinh</h5>
              <p className="member-description">Bundle of energy.</p>
              <a className="github" href="https://github.com/DaveDH2"><i className="fa fa-github fa-lg"></i></a>
              <a className="linkedin" href="https://www.linkedin.com/in/davedh2"><i className="fa fa-linkedin fa-lg"></i></a>
            </div>
            <div className="team-member-block">
              <img id="nimi-pic" src="./../../asset/nimi.jpeg" />
              <h5 className="member-name">Nimi
                <br/>Dharithreesan</h5>
              <p className="member-description">All-around badass.</p>
              <a className="github" href="https://github.com/ndharithreesan"><i className="fa fa-github fa-lg"></i></a>
              <a className="linkedin" href="https://www.linkedin.com/in/ndharithreesan"><i className="fa fa-linkedin fa-lg"></i></a>
            </div>
            <div className="team-member-block">
              <img id="mark-pic" src="./../../asset/mark.jpg" />
              <h5 className="member-name">Mark
                <br/>Bennett</h5>
              <p className="member-description">Extremely huggable.</p>
              <a className="github" href="https://github.com/mwbennett"><i className="fa fa-github fa-lg"></i></a>
              <a className="linkedin" href="https://www.linkedin.com/in/bennettwmark"><i className="fa fa-linkedin fa-lg"></i></a>
            </div>
            <div className="team-member-block">
              <img id="scott-pic" src="./../../asset/scott_blue_glasses.jpg" />
              <h5 className="member-name">Scott
                <br/>Maloff</h5>
              <p className="member-description">Marketing guru.</p>
              <a className="github" href="http://www.scottmaloff.com"><i className="fa fa-globe fa-lg"></i></a>
              <a className="linkedin" href="https://www.linkedin.com/in/scottmaloff"><i className="fa fa-linkedin fa-lg"></i></a>
            </div>
          </div>
        </div>
        <div className="bar5 stack">
          <div className="title-block title-block-right">
            <h1>Our Stack</h1>
            <h4>The tools used to build Coder Girl.</h4>
          </div>
          <div className="stack-block content-container">
            <div className="stack-group stack-frontend">
              <div className="stack-single">
                <a href="https://facebook.github.io/react/" className="react">
                  <img className="stack" alt="React" src="./../../asset/react.png" />
                </a>
              </div>
              <div className="stack-single">
                <a href="http://foundation.zurb.com/apps/" className="foundation">
                  <img className="stack" alt="Foundation" src="./../../asset/foundation.png" />
                </a>
              </div>
              <div className="stack-single">
                <a href="https://facebook.github.io/flux/" className="flux">
                  <img className="stack" alt="Flux" src="./../../asset/flux.png" />
                </a>
              </div>
            </div>
            <div className="stack-group stack-backend">
              <div className="stack-single">
                <a href="https://nodejs.org/" className="node">
                  <img className="stack" alt="Node.js" src="./../../asset/node.png" />
                </a>
              </div>
              <div className="stack-single">
                <a href="http://socket.io/" className="socketio">
                  <img className="stack" alt="Socket.io" src="./../../asset/socketio.png" />
                </a>
              </div>
              <div className="stack-single">
                <a href="http://www.postgresql.org/" className="postgresql">
                  <img className="stack" alt="PostgreSQL" src="./../../asset/postgresql.jpg" />
                </a>
              </div>
              <div className="stack-single">
                <a href="https://instagram.com/developer/" className="instagram">
                  <img className="stack" alt="Instagram API" src="./../../asset/instagram.jpg" />
                </a>
              </div>
            </div>
            <div className="stack-group stack-devops">
              <div className="stack-single">
                <a href="http://jasmine.github.io/" className="jasmine">
                  <img className="stack" alt="Jasmine" src="./../../asset/jasmine.png" />
                </a>
              </div>
              <div className="stack-single">
                <a href="https://travis-ci.org/" className="travisci">
                  <img className="stack" alt="TravisCI" src="./../../asset/travisci.jpg" />
                </a>
              </div>
              <div className="stack-single">
                <a href="http://gulpjs.com/" className="gulp">
                  <img className="stack" alt="Gulp" src="./../../asset/gulp.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bar6 footer">
          <div className="content-container start-coding">
            <h5><a href="http://www.codergirl.io" className="get-started">Start learning with Coder Girl</a></h5>
            <p className="copyright">&copy;Coder Girl, 2015</p>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = About;
