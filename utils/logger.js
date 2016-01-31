var logger = require('winston');

module.exports.getLogger = function(){
  logger.remove(logger.transports.Console);
  logger.add(
    logger.transports.Console, {
      level: 'debug',
      showLevel: true,
      colorize: true,
      json: false,
      timestamp: true
    }
  );
  return logger;
}