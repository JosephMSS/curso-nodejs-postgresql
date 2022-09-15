const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config');
/**
 *
 * La información que vamos a incluir en el jwt, **Nunca guardar información sensible**
 * @typedef {Object} payload
 * @property {String} sub Es el ID del usuario con el cual vamos a verificar en la BD
 * @property {String} role El que tiene nuestro usuario
 */

/**
 * @callback  done
 * @param {Error | null} error El null se usa en casos de éxito
 * @param {User | Boolean } data Información que retorna en el **Objeto req**
 * @returns {Request}
 */
/**
 * @param {String} username alias del usuario
 * @param {payload} payload info del usuario
 * @param {done} done esta función la empleamos después de validar si la contraseña es correcta o no
 * @link https://www.passportjs.org/packages/passport-jwt/
 */
async function verify(payload, done) {
  return done(null, payload);
}
/**
 * @type {Object} options
 * @property {JwtFromRequestFunction} jwtFromRequest  Define la de donde vamos a obtener el token del request
 * @property {String} secretOrKey Contiene el secret definido en el .env
 */
/**
 * @type {options}
 */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.auth.jwtSecret,
};
/**
 * Creamos la instancia de la estrategia
 * para implementarla en el
 * index de auth
 */
const jwtStrategy = new Strategy(options, verify);
module.exports = { jwtStrategy };
