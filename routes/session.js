//var User = require('./../model/user');
var uid = require('uid');
var crypto = require('crypto');
var algorithm = 'des-ede3-cbc';

module.exports.create = function(req, res, next) {

  var user = req.body.user;
  var psw = req.body.password;
  var client_id = uid(20);
  var client_secret = encrypt(client_id, psw);

  res.status(200).json({ 'client_id': client_id, 'client_secret': client_secret });

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