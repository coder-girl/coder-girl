/* 
* @Author: nimi
* @Date:   2015-05-26 11:45:15
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 12:11:51
*/

'use strict';

var express = require('express');


var app = express();

require('./config/middleware.js')(app, express);

app.set('port', (process.env.SECOND_PORT || 8080));

app.listen(app.get('port'), function(){
  console.log("The testing server is running on port " + app.get('port'));
})

module.exports = app;
