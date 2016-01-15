var model = module.exports;
var jwt = require('jsonwebtoken');
var error = require('../../node_modules/oauth2-server/lib/error');
var db = require('./config-db');
var fs = require('fs');

// In-memory datastores:
var oauthAccessTokens = db.oauthAccessTokens;
var oauthRefreshTokens = db.oauthRefreshTokens;
var oauthClients = db.oauthClients;
var authorizedClientIds = db.authorizedClientIds;
var users = db.users;

// Debug function to dump the state of the data stores
model.dump = function() {
  console.log('oauthAccessTokens', oauthAccessTokens);
  console.log('oauthClients', oauthClients);
  console.log('authorizedClientIds', authorizedClientIds);
  console.log('oauthRefreshTokens', oauthRefreshTokens);
  console.log('users', users);
};

/*
 * Optional
 */
model.generateToken = function (type, req, callback) {

  var username = req.body.username;
  var password = req.body.password;
  var refresh_token = req.body.refresh_token;
  var token;
  var algorithm = 'RS256';

  var privateKey = 'private.key';
  try {
    privateKey = fs.readFileSync('./private/server.key');
  } catch(err) {
    console.warn('Not server.key founded. Use default.');
  }

  var cert = 'private.key';
  var options;
  try {
    cert = fs.readFileSync('./private/hostname.pem');
    options = { 
      'algorithm': algorithm,
      'headers': {
        'alg'       : algorithm, 
        'typ'       : 'JWT',
        'jwtid'     : 'In-memory-' + type,
        'expiresIn' : 60
      }
    };
  } catch(err) {
    console.warn('Not hostname.pem founded. Use default.');
  }

  if (refresh_token) {

    try {
      var decoded = jwt.verify(refresh_token, cert, { algorithm: ['RS256'] });
      username = decoded.username;
    } catch(err) {
      throw error('invalid_token', err.message, err);
    }

  }

  token = jwt.sign({ 'username' : username }, privateKey, options);

  callback(false, token);
};

/*
 * Required Methods
 */

model.getAccessToken = function (bearerToken, callback) {
  for(var i = 0, len = oauthAccessTokens.length; i < len; i++) {
    var elem = oauthAccessTokens[i];
    if(elem.accessToken === bearerToken) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

model.getClient = function (clientId, clientSecret, callback) {
  for(var i = 0, len = oauthClients.length; i < len; i++) {
    var elem = oauthClients[i];
    if(elem.clientId === clientId &&
      (clientSecret === null || elem.clientSecret === clientSecret)) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

model.grantTypeAllowed = function (clientId, grantType, callback) {
  callback(false, authorizedClientIds[grantType] &&
    authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0);
};

model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
  oauthAccessTokens.unshift({
    accessToken: accessToken,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  callback(false);
};

/*
 * Required to support authorization_code grant type
 */
/*model.getAuthCode = function (authCode, callback) {

};

model.saveAuthCode = function (authCode, clientId, expires, user, callback) {

};*/

/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
  for(var i = 0, len = users.length; i < len; i++) {
    var elem = users[i];
    if(elem.username === username && elem.password === password) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

/*
 * Required to support refresth_token grant type
 */
model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
  oauthRefreshTokens.unshift({
    refreshToken: refreshToken,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  callback(false);
};

model.getRefreshToken = function (bearerToken, callback) {
  for(var i = 0, len = oauthRefreshTokens.length; i < len; i++) {
    var elem = oauthRefreshTokens[i];
    if(elem.refreshToken === bearerToken) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

/*
 * Optional for Refresh Token grant type
 */
/*model.revokeRefreshToken = function (refreshToken, callback) {

};*/



/*
 * Required for extension grant grant type
 */
/*model.extendedGrant = function (grantType, req, callback) {

};*/

/*
 * Required for client_credentials grant type
 */
/*model.getUserFromClient = function (clientId, clientSecret, callback) {

};*/