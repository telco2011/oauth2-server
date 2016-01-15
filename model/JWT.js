//https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html
//https://github.com/auth0/node-jsonwebtoken
var jwt = require('jsonwebtoken');
var error = require('../node_modules/oauth2-server/lib/error');
var fs = require('fs');
var uuid = require('node-uuid');
var moment = require('moment');
var DateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

module.exports.generateJWT = function (type, req) {

  var username = req.body.username;
  var password = req.body.password;
  var refresh_token = req.body.refresh_token;
  var token;
  var algorithm = 'RS256';
  var notBeforeDate = '2016-01-01 13:00:00';
  var expiredDate = '2016-01-15 15:40:00';

  var privateKey = getPrivateKey();

  var cert = getCert();

  if (refresh_token) {

    try {
      
      var decoded = jwt.verify(refresh_token, 
      	cert, 
      	{ algorithm: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'], 
      	ignoreExpiration : false });

      username = decoded.username;

    } catch(err) {
      throw error('invalid_token', err.message, err);
    }

  }

  var options = {
    'algorithm' : algorithm
  };

  var notBefore = getDateTime(notBeforeDate);
  var expired   = getDateTime(expiredDate);

  if(privateKey === 'private.key') {
  	token = jwt.sign({ 'username' : username }, privateKey);
  } else {
  	token = jwt.sign({ 
	    'username' : username,
	    'jti'      : uuid.v4(),
	    'nbf'      : notBefore,
	    'exp'      : expired
	  }, privateKey, options);
  }

  return token;
};

var getDateTime = function (value) {
	return moment(value, DateTimeFormat).valueOf()/1000;
};

var getPrivateKey = function () {

  var privateKey;
  try {
    privateKey = fs.readFileSync('./private/server.key');
  } catch(err) {
  	privateKey = 'private.key';
    console.warn('No key founded. Use default.');
  }

  return privateKey;

};

var getCert = function () {

  var cert;
  try {
    cert = fs.readFileSync('./private/hostname.pem');
  } catch(err) {
  	cert = 'private.key'
    console.warn('No pem founded. Use default.');
  }

  return cert;

};

module.exports.getCertificate = getCert;