const { Strategy } = require('passport-local');
const { AuthService } = require('../../../services/auth.service');
const service = new AuthService();

/**
 * @callback  done
 * @param {Error | null} error El null se usa en casos de éxito
 * @param {User | Boolean } data Información que retorna en el **Objeto req**
 * @returns {Request}
 */
/**
 * Valida si el usuario tiene la contraseña correcta
 * @param {String} username alias del usuario
 * @param {String} password contraseña del usuario
 * @param {done} done esta función la empleamos después de validar si la contraseña es correcta o no
 * @link https://www.passportjs.org/packages/passport-local/
 */
async function verify(email, password, done) {
  try {
    const userWithoutPassword = await service.getUser(email, password);
    done(null, userWithoutPassword);
  } catch (error) {
    /**
     * En caso de error la función done
     * va a finalizar la ejecución y
     * retornar el error en el req
     */
    done(error, false);
  }
}
/**
 * @typedef {Object} options
 * @property {String} usernameField Cambia la configuración por defecto del
 * middleware de passport (username) por el
 * que sustituyamos
 * @property {String} passwordField Cambia la configuración por defecto del
 * middleware de passport (password) por el
 * que sustituyamos
 */
/**
 * @type {options}
 */
const options = {
  usernameField: 'email',
  passwordField: 'password',
};
/**
 * Creamos la instancia de la estrategia
 * para implementarla en el
 * index de auth
 */
const LocalStrategy = new Strategy(options, verify);
module.exports = { LocalStrategy };
