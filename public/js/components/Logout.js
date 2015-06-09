//No longer being used

'use strict';

var React = require('react/addons');
var AuthActions = require('../actions/AuthActions');


var Logout = React.createClass({


  handleLogout : function(event){
    AuthActions.logout();
  },

  render : function(){
    return (
      <div>
          <span><button onClick={this.handleLogout}>Logout</button></span>
      </div>
    );
  }

});

module.exports = Logout;