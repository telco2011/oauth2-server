exports.index = function(req, res){
  res.render('index');
};

exports.session = require('./session');
