exports.index = function(req, res){
  res.render('index');
};

exports.session = require('./session');
exports.verify = require('./verify');
exports.decode = require('./decode');
exports.information = require('./information');
//exports.users = require('./users');
