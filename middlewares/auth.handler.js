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
/**
 * //TODO: HAcer un proyecto de gestión de permisos
 * Recibe una lista de parámetros con los roles que se van a verificar
 * Si se quiere usar una capa con mayor complejidad existe la librería
 * [accessControl](https://www.npmjs.com/package/accesscontrol)
 * @example 'admin','customer','seller'
 * @param  {...any} roles
 * @returns {Function}
 */
function checkRole(...roles) {
  return (req, res, next) => {
    const { user } = req;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(unauthorized());
    }
  };
}
module.exports = { checkApiKey, checkRole };
