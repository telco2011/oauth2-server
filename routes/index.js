exports.index = function(req, res){
  res.render('index');
};

exports.session = require('./session');
exports.verify = require('./verify');
exports.decode = require('./decode');
//exports.users = require('./users');
