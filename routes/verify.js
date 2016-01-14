module.exports.token = function(req, res, next) {

  res.status(200).json({verified_token : true});

};