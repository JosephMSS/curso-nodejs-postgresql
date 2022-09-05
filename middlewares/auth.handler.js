const { unauthorized } = require('@hapi/boom');
const { config } = require('../config');
function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.auth.apiKey) {
    next();
  } else {
    next(unauthorized());
  }
}
module.exports = { checkApiKey };
