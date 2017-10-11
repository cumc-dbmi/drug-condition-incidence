var http = require('http');
var path = require('path');
var express = require('express');

var app = module.exports = express();
app.use(express.static(path.join(__dirname, 'dist')));

// app startup
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log('Express server running on *:' + port);
});
