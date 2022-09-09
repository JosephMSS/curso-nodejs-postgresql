const { hash } = require('bcrypt');
/**
 * El segundo argumento es la cantidad de veces que queremos encriptar un parámetro
 */
class PassHash {
  /**
   * Se generar el hash de la contraseña
   * @param {String} password Contraseña del usuario
   * @returns {String} El hash de la contraseña
   */
  static async getHash(password) {
    const newHash = await hash(password, 10);
    return newHash;
  }
}
module.exports = { PassHash };
