var jwt = require('jsonwebtoken');
var jwtutil = require('../../../model/JWT');

module.exports.token = function(req, res, next) {

  var token = req.query.access_token || req.body.access_token;

  var cert = jwtutil.getCertificate();

  var decoded = jwt.verify(token, cert, { algorithm: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'], ignoreExpiration : false }, function(err, decoded) {
  	if (err) {
  	  res.status(401).json({ 'code': 401, 'error': 'invalid_token', 'error_description': err.message });
  	} else {
      var token_information = jwt.decode(token, {complete: true});
  	  res.status(200)
        .json({ 'header'  : token_information.header, 'payload' : token_information.payload });
  	}

  });

};
