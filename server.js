var express = require('express');
var bodyParser = require('body-parser');
var ip = require('ip');
//https://github.com/thomseddon/node-oauth2-server
var oauthserver = require('oauth2-server');
var routes = require('./routes');
var utils = require('./utils');
var logger = utils.logger.getLogger();

var app = express();

var memorystore = require('./model/db-store/in-memory.js');

app.set('views', './views')
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthserver({
  model: memorystore,
  accessTokenLifetime: 60,
  refreshTokenLifetime: 120,
  authCodeLifetime: 60,
  grants: ['password','refresh_token'],
  debug: true
});

app.all('/oauth2/token', app.oauth.grant());

app.route('/oauth2/authorise')
  .get(app.oauth.authorise(), routes.verify.token)
  .post(app.oauth.authorise(), routes.verify.token);

app.route('/oauth2/token-info')
  .get(app.oauth.authorise(), routes.decode.token)
  .post(app.oauth.authorise(), routes.decode.token);

app.route('/oauth2/info')
  .get(routes.information.mdpublic)
  .post(routes.information.mdpublic);

app.get('/oauth2', function (req, res) {
  res.render('index', { title: 'Oauth2 Example', sessionUrl: '/oauth/session' });
});

app.post('/oauth2/session', routes.session.create);
app.get('/oauth2/session', routes.session.show);

// Error handling
app.use(app.oauth.errorHandler());

var port = process.env.PORT || 3000;
var host = process.env.HOSTNAME || ip.address() || 'localhost';

app.listen(port, host, function() {
  logger.info('Oauth2 server listening at http://%s:%s', host, port);
});

module.exports = app;