var model = module.exports;
var jwt = require('jsonwebtoken');
var db = require('./config-db');

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

  if (refresh_token) {
    var decoded = jwt.decode(refresh_token, {complete: true});

    username = decoded.payload.username;
    password = decoded.payload.password;
  }

  var token = jwt.sign(
  { 
    username: username
  }, 
  'private.key',
  {
    headers: {type:type}
  });

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