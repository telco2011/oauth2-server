var uid = require('uid');
var client_id = uid(20);

console.log('UID: ' + client_id);

// Nodejs encryption with CTR
var crypto = require('crypto');
var algorithm = 'des-ede3-cbc';
    //algorithm = 'aes-256-ctr',
var password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','base64')
  crypted += cipher.final('base64');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt(client_id);
console.log('encrypt: ' + hw);
console.log('decrypt: ' + decrypt(hw));