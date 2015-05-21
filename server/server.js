var express = require('express');

var app = express();

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// export for testing and flexibility
module.exports = app;
