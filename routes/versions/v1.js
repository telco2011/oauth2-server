var express = require('express');
var verify = require('./v1/verify');
var decode = require('./v1/decode');
var information = require('./v1/information');
var defaultRoute = require('../default');

var v1 = express();

v1.all('/token', defaultRoute.oauth.grant());

v1.route('/authorise')
  .get(defaultRoute.oauth.authorise(), verify.token)
  .post(defaultRoute.oauth.authorise(), verify.token);

v1.route('/token-info')
  .get(defaultRoute.oauth.authorise(), decode.token)
  .post(defaultRoute.oauth.authorise(), decode.token);

v1.route('/info')
  .get(information.mdpublic)
  .post(information.mdpublic);

module.exports = v1;
