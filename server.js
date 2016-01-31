var express = require('express');
var bodyParser = require('body-parser');
var ip = require('ip');
var routes = require('./routes/default.js');

var utils = require('./utils');
var logger = utils.logger.getLogger();

var server = express();

server.set('views', './views');
server.set('view engine', 'jade');
server.use('/static', express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/oauth2', require('./routes/default'));
server.use('/oauth2/v1', require('./routes/versions/v1'));

// Error handling
server.use(routes.oauth.errorHandler());

var port = process.env.PORT || 3000;
var host = process.env.HOSTNAME || ip.address() || 'localhost';

server.listen(port, host, function() {
  logger.info('Oauth2 server listening at http://%s:%s', host, port);
});

module.exports = server;
