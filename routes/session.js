var db = require('../model/db-store/config-db');
var uid = require('uid');
var crypto = require('crypto');
var algorithm = 'des-ede3-cbc';
var utils = require('../utils');
var logger = utils.logger.getLogger();


// In-memory datastores:
var oauthAccessTokens = db.oauthAccessTokens;
var oauthRefreshTokens = db.oauthRefreshTokens;
var oauthClients = db.oauthClients;
var authorizedClientIds = db.authorizedClientIds;
var users = db.users;

module.exports.create = function(req, res, next) {

  var user = req.body.user;
  var psw = req.body.password;
  var userExists = false;

  logger.debug(db);

  for(var i = 0, len = users.length; i < len; i++) {
    var elem = users[i];
    if(elem.username === user) {
      userExists = true;
      i = users.length;
    }
  }

  if(userExists) {
    logger.warn('error login');
    res.render('login', { error: 'User "' + user + '" exists.' });
  } else {
    logger.debug('success login');
    var client_id = uid(20);
    var client_secret = encrypt(client_id, psw);

    users.unshift({
      id: 2,
      username: user,
      password: psw
    });

    oauthClients.unshift({
      clientId: client_id,
      clientId: client_secret,
      redirectUri: ''
    });

    authorizedClientIds.password.push(client_id);
    authorizedClientIds.refresh_token.push(client_id);

    logger.debug(db);

    res.status(200).json({ 'client_id': client_id, 'client_secret': client_secret });
  }
  
};

module.exports.show = function(req, res, next) {
  res.render('login');
};

function encrypt(text, psw){
  var cipher = crypto.createCipher(algorithm,psw);
  var crypted = cipher.update(text,'utf8','base64');
  crypted += cipher.final('base64');
  return crypted;
}
 
function decrypt(text, psw){
  var decipher = crypto.createDecipher(algorithm,psw);
  var dec = decipher.update(text,'base64','utf8');
  dec += decipher.final('utf8');
  return dec;
}