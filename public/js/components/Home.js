var React = require('react');
var Leaderboard = require('./Leaderboard');
var Chat = require('./Chat');
var Router = require('react-router');
// var Topbar = require('../components/Topbar');
var Editor = require('../components/Editor');
var Link = Router.Link;

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

var Home = React.createClass({

  contextTypes: {
    router: React.PropTypes.func // 
  },


  displayName: 'Home',
  mixins: [Router.State, Router.Navigation],

  render: function() {

    var name = this.context.router.getCurrentPath();

    if (!window.localStorage.getItem('io.codergirl')) {
      this.transitionTo('/login');
    }

    return (
      <div>
<<<<<<< HEAD
      <div className="row">
        <div className="small-6 large-6 columns">Challenge</div>
        <div className="small-4 large-4 columns">Editor</div>
        <div className="small-2 large-2 columns"> <Leaderboard /></div>
      </div>
=======
        <div className="row">
          <div className="small-6 large-6 columns">
            <ul>
              <li>
                <Link to="page1">Page 1</Link>
              </li>
              <li>
                <Link to="page2">Page 2</Link>
              </li>
            </ul>
            <Router.RouteHandler/>
          </div>
          <div className="small-4 large-4 columns">
            Editor
          </div>
          <div className="small-2 large-2 columns">
            Leaderboard
          </div>
        </div>
        <div className="row">
          Chat
        </div>
      </div>
    );
  }
});


>>>>>>> (feat) Implement baby version of welcome routes

var Page1 = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <Editor />
        </div>
        <div>
          <Leaderboard />
        </div>
      </div>
    );
  }
});


var Page2 = React.createClass({

  render: function() {
    return (
      <div>
        <Leaderboard />
      </div>
    );
  }
});

exports.Home = Home;
exports.Page1 = Page1;
exports.Page2 = Page2;
