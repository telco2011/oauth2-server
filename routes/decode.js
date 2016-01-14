var jwt = require('jsonwebtoken');
var fs = require('fs');

module.exports.token = function(req, res, next) {

  var token = req.query.access_token || req.body.access_token;

  var cert = fs.readFileSync('./private/hostname.pem');

  var decoded = jwt.verify(token, cert, { algorithm: ['RS256'] }, function(err, decoded) {
  	if (err) {
  	  var code = 401,
  		error = "invalid_token",
  		error_description = err.message;
  	  res.status(401).json({code : code, error : error, error_description : error_description});
  	} else {
  	  res.status(200).json({token_information : decoded});
  	}

  });

};