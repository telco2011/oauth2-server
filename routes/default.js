var express = require('express');
//https://github.com/thomseddon/node-oauth2-server
var oauthserver = require('oauth2-server');
var session = require('./session');
var utils = require('../utils');
var logger = utils.logger.getLogger();

var defaultRoute = express();

var memorystore = require('../model/db-store/in-memory.js');

defaultRoute.oauth = oauthserver({
  model: memorystore,
  accessTokenLifetime: 60,
  refreshTokenLifetime: 120,
  authCodeLifetime: 60,
  grants: ['password','refresh_token'],
  debug: true
});

defaultRoute.get('/', function (req, res) {
  logger.debug('Access to index.');
  res.render('index', { title: 'Oauth2 Example', sessionUrl: '/oauth2/session' });
});

defaultRoute.post('/session', session.create);
defaultRoute.get('/session', session.show);

module.exports = defaultRoute;
