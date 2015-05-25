

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
          <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }

});

module.exports = Logout;