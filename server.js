var express = require('express');
var bodyParser = require('body-parser');
var ip = require('ip');
//https://github.com/thomseddon/node-oauth2-server
var oauthserver = require('oauth2-server');
var routes = require('./routes');

var app = express();

var memorystore = require('./model/db-store/in-memory.js');

app.set('views', './views')
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthserver({
  model: memorystore,
  accessTokenLifetime: 600,
  refreshTokenLifetime: 600,
  authCodeLifetime: 30,
  grants: ['password','refresh_token'],
  debug: true
});

// Handle token grant requests
app.all('/oauth/token', app.oauth.grant());

app.route('/oauth/verify', app.oauth.authorise())
  .get(function (req, res) {
    res.send('Valid token');
  })
  .post(function (req, res) {
    res.send('Valid token');
  });

app.route('/oauth/info', app.oauth.authorise())
  .get(function (req, res) {
    res.send('Decoded token information');
  })
  .post(function (req, res) {
    res.send('Decoded token information');
  });

app.route('/public')
  .get(function (req, res) {
    res.send('Public area');
  })
  .post(function (req, res) {
    res.send('Public area');
  });

app.get('/', function (req, res) {
  // Does not require an access_token
  res.render('index', { title: 'Oauth2 Example'});
});

//app.post('/session', routes.session.create);
app.get('/session', routes.session.show);

// Error handling
app.use(app.oauth.errorHandler());

var port = process.env.PORT || 3001;
var host = ip.address() || 'localhost';

app.listen(port, host, function() {
  console.log('Oauth2 server listening at http://%s:%s', host, port);
});