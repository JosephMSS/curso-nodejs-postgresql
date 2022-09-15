const passport = require('passport');
const { LocalStrategy } = require('./strategies/local.strategy');
const { jwtStrategy } = require('./strategies/jwt.strategy');
/**
 * Este método debe ser llamado en el punto de entrada de la app
 * @description Las estrategias deben ser registradas en passport,
 * con el  nombre que definimos lo podemos emplear
 * en los middlewares de autenticación
 */
function registerStrategies() {
  passport.use('localStrategy', LocalStrategy);
  passport.use('jwtStrategy', jwtStrategy);
}
module.exports = { registerStrategies };
