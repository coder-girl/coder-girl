/* 
* @Author: Mark Bennett
* @Date:   2015-06-15 16:38:30
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-15 16:47:11
*/

'use strict';


var React = require('react/addons');


var MobileMessage = React.createClass({

  render: function() {
    
    return (
      <div id="mobile-message">
        <img className="mobile-message-pic" src="../asset/CoderGirl-WhiteBackground.png"></img>  
        Mobile Version Coming Soon! 
      </div>
    );
  }
});

module.exports = MobileMessage;
    